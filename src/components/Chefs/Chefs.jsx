import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Chef from '../Chef/Chef';
import { AuthContext } from '../../providers/AuthProvider';
import Scroll from '../../utils/Scroll';

const Chefs = () => {
  const chefsData = useLoaderData();
  const { loading } = useContext(AuthContext);
  return (
    <div className='bg-base-200'>
      <Scroll />
      {loading && (
        <div className='container mx-auto'>
          <div className='h-screen flex justify-center items-center'>
            <PacmanLoader size={75} color='#36d7b7' />
          </div>
        </div>
      )}
      <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center container mx-auto pt-12 md:px-0'>
        {chefsData.map((chef) => (
          <Chef key={chef.id} chef={chef}></Chef>
        ))}
      </div>
    </div>
  );
};

export default Chefs;
