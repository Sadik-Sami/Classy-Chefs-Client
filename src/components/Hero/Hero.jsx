import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='flex min-h-[700px]  w-full items-center justify-center bg-base-100 px-8 pt-10'>
      <div className='flex w-full max-w-6xl gap-10 lg:flex-row flex-col items-center justify-between'>
        <div className='max-w-md md:space-y-6 sm:space-y-5 space-y-4'>
          <h1 className='lg:text-4xl sm:text-3xl text-2xl font-bold leading-tight text-primary'>
            Take your restaurant to the next level.
          </h1>
          <p className='lg:text-lg sm:text-base text-sm text-secondary'>
            Improve the taste of your restaurants food. Attract the right
            customers your way with our world class chefs and their recipeies
          </p>
          <div className='flex space-x-4'>
            <Link to='/chefs'>
              <button className='inline-flex flex-nowrap items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-primary text-white'>
                Hire chefs
              </button>
            </Link>
            <Link to='/about'>
              <button className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-transparent text-secondary hover:text-white'>
                Learn More
              </button>
            </Link>
          </div>
          <p className='text-sm text-gray-500'>Trusted by 5000+ Users</p>
        </div>
        <div className='relative'>
          <LazyLoad height={600}>
            <img
              src='https://images.unsplash.com/photo-1654922207993-2952fec328ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              className='relative md:h-[600px] sm:h-[500px] h-[300px] w-[500px] bg-gray-400 rounded-b-full object-cover'
            />
          </LazyLoad>
        </div>
      </div>
    </section>
  );
};

export default Hero;
