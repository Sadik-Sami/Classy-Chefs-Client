import React, { useContext } from 'react';
import Chef from '../Chef/Chef';
import { Link } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { AuthContext } from '../../providers/AuthProvider';
const ChefsSection = ({ chefsData }) => {
  const { dataLoading } = useContext(AuthContext);
  return (
    <div className='bg-base-100'>
      <h2 className='text-center pt-5 font-semibold text-3xl'>
        Meet Our Chefs
      </h2>
      {dataLoading && (
        <div className='flex justify-center items-center my-10'>
          <PacmanLoader
            size={100}
            color='#22c55e'
            speedMultiplier={0.8}
          />
        </div>
      )}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 container mx-auto px-2 lg:px-0 gap-2'>
        {chefsData.map((chef) => (
          <Chef
            key={chef.id}
            chef={chef}></Chef>
        ))}
      </div>
      <Link to='/chefs'>
        <div className='flex justify-center items-center my-4'>
          <button className='hover:bg-success hover:scale-95 font-medium hover:text-white w-1/4 py-2 rounded-full hover:shadow-xl  shadow-[0px_0px_10px_#E2DADA] duration-500 outline outline-1 outline-success mx-auto'>
            Show All Chefs
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ChefsSection;
