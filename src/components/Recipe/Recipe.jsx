import React from 'react';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const Recipe = ({ recipe }) => {
  const { chef_id, id, photo, ingredients, instructions, name } = recipe;
  useTitle(name)
  return (
    <div className='card w-72 bg-base-100 shadow-xl mt-24 font-poppins'>
      <figure>
        <img
          src={photo}
          alt='Shoes'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>
        <p>{instructions}</p>
        <div className='card-actions justify-end'>
          <Link to={`/recipe/${id}`}>
            <button className='btn btn-primary'>View Recipe</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
