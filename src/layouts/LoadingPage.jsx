import React from 'react';
import { PacmanLoader } from 'react-spinners';

const LoadingPage = () => {
  return (
    <div className='container mx-auto'>
      <div className='h-screen flex justify-center items-center'>
        <PacmanLoader
          size={100}
          color='#36d7b7'
        />
      </div>
    </div>
  );
};

export default LoadingPage;
