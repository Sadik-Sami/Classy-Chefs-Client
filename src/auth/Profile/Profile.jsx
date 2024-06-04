import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const { user, userName, userPhoto, setLoading } = useContext(AuthContext);
  const [name, set_Name] = useState('');
  const [photoURL, set_PhotoURL] = useState('');
  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleName = (e) => {
    const nameInput = e.target.value;
    set_Name(nameInput);
  };
  const handlePhotoURL = (e) => {
    const urlInput = e.target.value;
    set_PhotoURL(urlInput);
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (name && photoURL) {
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
      setLoading(false);
      toast.custom((t) => (
        <div
          className={`bg-white px-6 py-4 shadow-lg border border-gray-700 rounded-full ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}>
          Information Updated !!!
        </div>
      ));
      refresh();
    } else if (name && !photoURL) {
      userName(name)
        .then(() => {
          setLoading(false);
          toast.custom((t) => (
            <div
              className={`bg-white px-6 py-4 shadow-lg border border-gray-700 rounded-full ${
                t.visible ? 'animate-enter' : 'animate-leave'
              }`}>
              Information Updated !!!
            </div>
          ));
          refresh();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (!name && photoURL) {
      userPhoto(photoURL)
        .then(() => {
          setLoading(false);
          toast.custom((t) => (
            <div
              className={`bg-white px-6 py-4 shadow-lg border border-gray-700 rounded-full ${
                t.visible ? 'animate-enter' : 'animate-leave'
              }`}>
              Information Updated !!!
            </div>
          ));
          refresh();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  return (
    <div className='flex h-screen items-center justify-center bg-[#8EA7E9]/20 p-6 md:p-0'>
      <Toaster position='bottom-left' />
      <div className='flex h-full w-full overflow-hidden rounded-xl shadow-md  md:h-[90%] md:w-[80%] lg:h-[80%]'>
        {/* register design side  */}
        <div className='relative hidden h-full items-center justify-center bg-[#8EA7E9] md:flex md:w-[60%] lg:w-[40%]'>
          <div className='absolute -top-2 left-[20%] h-16 w-16 rounded-full bg-gradient-to-br  from-white via-[#9eb6f8] to-[#6585dd]'></div>
          <div className='absolute bottom-[18%] left-[20%] h-20 w-20 rounded-full bg-gradient-to-br  from-white via-[#9eb6f8] to-[#6585dd]'></div>
          <div className='absolute -right-7 top-[50%] h-14 w-14 -translate-y-1/2 rounded-full bg-gradient-to-br from-white via-[#9eb6f8] to-[#6585dd] transition-all'></div>
          <div className='absolute left-[50%] top-[22%] h-24 w-24 -translate-x-1/2 rounded-full  bg-gradient-to-br from-white via-[#9eb6f8] to-[#6585dd]'></div>
          <div className='space-y-2 text-center'>
            <h2 className='text-5xl font-medium text-white/80 '>Welcome</h2>
            <p className='animate-pulse text-2xl text-white/60'>
              {user.displayName}
            </p>
          </div>
        </div>
        {/* input side  */}
        <div className='flex w-full flex-col justify-center bg-white py-10 lg:w-[60%]'>
          <h2 className='pb-8 text-center text-3xl font-bold text-[#8EA7E9]'>
            Update your Profile
          </h2>
          <form
            onSubmit={handleUpdateProfile}
            className='flex  w-full flex-col items-center justify-center gap-4'>
            <input
              className='w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]'
              id='name'
              type='name'
              value={name}
              onChange={handleName}
              placeholder={user.displayName}
            />
            <input
              className='w-[80%] rounded-lg border border-[#8EA7E9] px-6 py-2 focus:outline-none focus:ring-2 focus:ring-[#8EA7E9]/50 md:w-[60%]'
              id='photo'
              type='text'
              value={photoURL}
              onChange={handlePhotoURL}
              placeholder='Photo URL'
            />
            {/* <input
              className='w-[80%] rounded-lg bg-[#8EA7E9] px-6 py-2 font-medium text-white md:w-[60%]'
              type='submit'
            /> */}
            <button
              type='submit'
              className='w-[80%] rounded-lg bg-[#8EA7E9] hover:scale-95 transition-all duration-300 hover:bg-white border hover:border-[#8EA7E9] hover:text-[#8EA7E9] px-6 py-2 font-medium text-white md:w-[60%]'
              disabled={name || photoURL ? false : true}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
