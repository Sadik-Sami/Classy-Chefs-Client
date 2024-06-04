import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useTitle from '../../hooks/useTitle';

const Login = () => {
  const {
    createUser,
    signIn,
    userName,
    userPhoto,
    signInWithGoogle,
    signInWithGithub,
  } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const path = location?.state?.from?.pathname || '/';
  const [register, setRegister] = useState(false);
  useTitle('Login');
  // registration handling
  const [name, set_Name] = useState('');
  const [photoURL, set_PhotoURL] = useState('');
  const [u_email, setU_Email] = useState('');
  const [u_password, setU_Password] = useState('');
  // registration errors
  const [nameError, set_NameError] = useState('');
  const [photoURLError, set_PhotoURLError] = useState('');
  const [u_EmailError, setU_EmailError] = useState('');
  const [u_PasswordError, setU_PasswordError] = useState('');
  // login handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // firebase errors
  const [error, setError] = useState('');
  const [popUpUser, setPopUpUser] = useState(null);
  // registration functions
  const handleName = (e) => {
    const uNameInput = e.target.value;
    set_Name(uNameInput);
    if (uNameInput) {
      set_NameError('');
    }
  };
  const handlePhotoURL = (e) => {
    const photoURLInput = e.target.value;
    set_PhotoURL(photoURLInput);
  };
  const handleUEmail = (e) => {
    const uEmailInput = e.target.value;
    setU_Email(uEmailInput);
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        uEmailInput
      )
    ) {
      setU_EmailError('invalid email address');
      return;
    } else if (uEmailInput) {
      setU_EmailError('');
    } else {
      setU_EmailError('');
    }
  };
  const handleUPassword = (e) => {
    const uPasswordInput = e.target.value;
    setU_Password(uPasswordInput);
    if (!/[A-Z]/.test(uPasswordInput)) {
      setU_PasswordError('Password must contain atleast one capital character');
      return;
    } else if (uPasswordInput.length < 6) {
      setU_PasswordError('Password must be more than 6 characters long');
      return;
    } else {
      setU_PasswordError('');
    }
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!u_email) {
      setU_EmailError('Email field cannot be empty');
    }
    if (!u_password) {
      setU_PasswordError('Password field cannot be empty');
    }
    if (!name) {
      set_NameError('Name field cannot be empty');
    }
    if (!photoURL) {
      set_PhotoURLError('Photo URL field cannot be empty');
    } else {
      setU_EmailError('');
      setU_PasswordError('');
      set_NameError('');
      set_PhotoURLError('');
    }
    createUser(u_email, u_password)
      .then((userCredential) => {
        const user = userCredential.user;
        userName(name)
          .then(() => {
            console.log('name updated');
          })
          .catch((error) => {
            console.log(error.message);
          });
        userPhoto(photoURL)
          .then(() => {
            console.log('photo updated');
          })
          .catch((error) => {
            console.log(error.message);
          });
        console.log(user);
        navigate(path, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  // login functions
  const loginEmail = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  };
  const loginPassword = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        toast.custom((t) => (
          <div
            className={`bg-white px-6 py-4 shadow-lg border border-gray-700 rounded-full ${
              t.visible ? 'animate-enter' : 'animate-leave'
            }`}>
            Hello {user.displayName} 👋, It's nice to have you here!
          </div>
        ));
        navigate(path, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorMessage);
      });
  };
  const googleSignInHandler = () => {
    signInWithGoogle()
      .then((result) => {
        navigate(path, { replace: true });
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCodee = error.errorCode;
        const errorMessage = error.errorMessage;
      });
  };
  const githubSignInHandler = () => {
    signInWithGithub()
      .then((result) => {
        navigate(path, { replace: true });
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setRedirect(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className='py-20 bg-base-200'>
      <Toaster position='top-center' />
      <div className='w-80 lg:h-[700px] md:w-96 lg:w-[800px] mx-auto bg-white flex items-center relative overflow-hidden shadow-xl mt-5 font-poppins'>
        {/* register form  */}
        <form
          onSubmit={handleRegistration}
          className={`p-8 w-full ${
            register
              ? 'lg:translate-x-0'
              : 'lg:-translate-x-full hidden lg:block'
          } duration-500`}>
          <h1 className='backdrop-blur-sm text-2xl font-semibold lg:text-4xl pb-4'>
            Register
          </h1>
          <div className='space-y-5'>
            <label htmlFor='name' className='block dark:text-black'>
              Name
            </label>
            <input
              id='name'
              type='name'
              value={name}
              onChange={handleName}
              placeholder='John Doe'
              className='p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black'
            />
            {nameError && <span className='error'>{nameError}</span>}
            <label htmlFor='photo' className='block dark:text-black'>
              Photo URL
            </label>
            <input
              id='photo'
              type='text'
              value={photoURL}
              onChange={handlePhotoURL}
              placeholder='Photo URL'
              className='p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black'
            />
            {photoURLError && <span className='error'>{photoURLError}</span>}
            <label htmlFor='u_email' className='block dark:text-black'>
              Email
            </label>
            <input
              id='u_email'
              type='u_email'
              value={u_email}
              onChange={handleUEmail}
              placeholder='example@example.com'
              className={`p-3 block w-full outline-none border rounded-md ${
                u_email
                  ? u_EmailError
                    ? 'border-red-600'
                    : 'border-green-600'
                  : 'invalid:border-red-700 valid:border-black'
              }`}
            />
            {u_EmailError && <span className='error'>{u_EmailError}</span>}
            <label htmlFor='u_password' className='block dark:text-black'>
              Password
            </label>
            <input
              id='u_password'
              type='u_password'
              value={u_password}
              onChange={handleUPassword}
              placeholder='..............'
              min={5}
              className={`p-3 block w-full outline-none border rounded-md ${
                u_password
                  ? u_PasswordError
                    ? 'border-red-600'
                    : 'border-green-600'
                  : 'invalid:border-red-700 valid:border-black'
              }`}
            />
            {u_PasswordError && (
              <span className='error'>{u_PasswordError}</span>
            )}
          </div>
          {/* button type will be submit for handling form submission*/}
          <button
            type='submit'
            className='py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block disabled:border-red-700'
            disabled={
              u_EmailError || u_PasswordError || nameError || photoURLError
                ? true
                : false
            }>
            Submit
          </button>
          <p className='mb-3 text-center'>
            Already have an account?
            <Link
              onClick={() => {
                setRegister(!register);
              }}
              className='underline font-semibold'>
              Login
            </Link>
          </p>
          <hr />
        </form>
        {/* img */}
        <div
          className={`hidden lg:block absolute w-1/2 h-full top-0 z-0 duration-500 overflow-hidden bg-black/20 ${
            register
              ? 'translate-x-full rounded-bl-full duration-500'
              : 'rounded-br-full'
          }`}>
          <img
            src='https://source.unsplash.com/random'
            className='object-cover h-full'
            alt='img'
          />
        </div>
        {/* login form */}
        <form
          className={`p-8 w-full mr-0 ml-auto duration-500 ${
            register ? 'lg:translate-x-full hidden lg:block' : ''
          }`}
          onSubmit={handleLogin}>
          <h1 className='backdrop-blur-sm text-2xl font-semibold lg:text-4xl pb-4'>
            Login
          </h1>
          <div className='space-y-5'>
            <label htmlFor='email' className='block'>
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={loginEmail}
              placeholder='example@example.com'
              className='p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black'
            />
            <label htmlFor='password' className='block'>
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={loginPassword}
              placeholder='..............'
              min={5}
              className='p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black'
            />
          </div>
          {/* button type will be submit for handling form submission*/}
          <button
            type='submit'
            className='py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block'>
            Submit
          </button>
          <p className='mb-3 text-center'>
            Don't have an account?
            <Link
              onClick={() => {
                setRegister(!register);
              }}
              className='underline font-semibold'>
              Register
            </Link>
          </p>
          <hr />
          <button
            type='button'
            onClick={googleSignInHandler}
            className='md:w-60 py-2 px-5 mb-4 mt-8 mx-auto block shadow-lg border rounded-md border-black text-sm'>
            <svg
              viewBox='-0.5 0 48 48'
              version='1.1'
              className='w-6 inline-block mr-3'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              fill='#000000'>
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g
                id='SVGRepo_tracerCarrier'
                strokeLinecap='round'
                strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <title>Google-color</title> <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id='Icons'
                  stroke='none'
                  strokeWidth='1'
                  fill='none'
                  fillRule='evenodd'>
                  <g
                    id='Color-'
                    transform='translate(-401.000000, -860.000000)'>
                    <g
                      id='Google'
                      transform='translate(401.000000, 860.000000)'>
                      <path
                        d='M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24'
                        id='Fill-1'
                        fill='#FBBC05'></path>
                      <path
                        d='M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333'
                        id='Fill-2'
                        fill='#EB4335'></path>
                      <path
                        d='M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667'
                        id='Fill-3'
                        fill='#34A853'></path>
                      <path
                        d='M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24'
                        id='Fill-4'
                        fill='#4285F4'></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            Continue with Google
          </button>
          <button
            type='button'
            onClick={githubSignInHandler}
            className='md:w-60 py-2 px-5 mb-4 mt-8 mx-auto block shadow-lg border rounded-md border-black text-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              className='w-6 inline-block mr-3'
              id='github'>
              <path d='M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z'></path>
            </svg>
            Continue with Github
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
