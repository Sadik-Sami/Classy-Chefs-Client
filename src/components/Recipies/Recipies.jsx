import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import Scroll from '../../utils/Scroll';
import useTitle from '../../hooks/useTitle';

const Recipies = () => {
  const recipiesData = useLoaderData();
  useTitle('Recipes');
  return (
    <div className='bg-base-200'>
      <Scroll />
      <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center container mx-auto'>
        {recipiesData.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe}></Recipe>
        ))}
      </div>
    </div>
  );
};

export default Recipies;
