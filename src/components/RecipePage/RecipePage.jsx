import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { addToDb, checkStatus } from '../../utils/fakedb';
import Scroll from '../../utils/Scroll';
import LazyLoad from 'react-lazy-load';
import useTitle from '../../hooks/useTitle';

const RecipePage = () => {
  const recipeData = useLoaderData();
  const { chef_id, photo, name, instructions, ingredients } = recipeData;
  const { id } = useParams();
  const [chefData, setChefsData] = useState({});
  useEffect(() => {
    fetch(`https://classy-chefs-server.vercel.app/chefs/${chef_id}`)
      .then((res) => res.json())
      .then((data) => setChefsData(data))
      .catch((error) => console.log(error));
  }, [chef_id]);
  const c_name = chefData.name;
  const { picture, recipes, years_of_experience, likes } = chefData;
  const addToBookmarks = (id) => {
    addToDb(id);
  };
  const checkAdded = checkStatus(id);
  useTitle(name);
  return (
    <div className='bg-base-200'>
      <Scroll />
      <div className='container bg-base-300 rounded-xl shadow-md mx-auto p-10 font-poppins'>
        <h1 className='mt-20 text-center text-4xl'>Chef Details</h1>
        <div className='grid md:grid-cols-2 justify-items-center mt-10'>
          <div className='row-span-8'>
            <LazyLoad height={485}>
              <img
                className='rounded-md'
                src='https://source.unsplash.com/728x485/?profile'
                alt={picture}
              />
            </LazyLoad>
          </div>
          <div className='row-span-4'>
            {/* Chef Details */}
            <div className='flex flex-col text-lg'>
              <p>
                <span className='font-semibold'>Chef Name</span> : {c_name}
              </p>
              <p>
                <span className='font-semibold'>Likes on this recipe</span> :{' '}
                {likes}
              </p>
              <p>
                <span className='font-semibold'>Experience</span> :{' '}
                {years_of_experience} Years of experience
              </p>
              <Link to='/recipies'>
                <button
                  onClick={() => addToBookmarks(id)}
                  className='text-xl box-border border-4 border-sky-900 w-48 h-16 bg-sky-600 text-white relative group mt-8'
                  disabled={checkAdded}>
                  <span className='pr-8'>
                    {checkAdded ? 'Bookmarked' : 'Bookmark'}
                  </span>
                  <span className='bg-sky-900 absolute right-0 top-0  h-full flex items-center justify-center px-1 group-hover:duration-300 group-hover:w-full w-10 duration-300'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                      />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <h1 className='mt-20 text-center font-bold text-2xl lg:text-5xl'>
          {name}
        </h1>
        <div className='grid md:grid-cols-2'>
          {/* Details */}
          <div className='row-span-4 mt-20'>
            {/* Recipe Details */}
            <div className='mt-4'>
              <h3 className='text-xl font-bold tracking-wide'>Ingredients</h3>
              <ul>
                {ingredients.map((value, index) => (
                  <li className='pl-4 text-lg' key={index}>
                    {value}
                  </li>
                ))}
              </ul>
              <div>
                <h2 className='text-xl mt-4 font-bold tracking-wide'>
                  Instructions :
                </h2>
                <p>{instructions}</p>
              </div>
            </div>
          </div>
          {/* Image */}
          <div className='row-span-8 mt-20'>
            <img className='rounded-lg' src={photo} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
