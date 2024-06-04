import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import Scroll from '../../utils/Scroll';
import { BsBookmarkXFill } from 'react-icons/bs';
import BookmarkedRecipe from '../BookmarkedRecipe/BookmarkedRecipe';
import { removeFromDb } from '../../utils/fakedb';
import useTitle from '../../hooks/useTitle';

const Bookmarks = () => {
  const bookmarkData = useLoaderData();
  const [bookmark, setBookmark] = useState(bookmarkData);
  const navigate = useNavigate();
  const removeFromBookmarks = (id) => {
    const remaining = bookmark.filter((product) => product.id !== id);
    setBookmark(remaining);
    removeFromDb(id);
    if (remaining.length == 0) {
      // window.location.reload();
      navigate(0);
    }
  };
  useTitle('Bookmarks');
  return (
    <div className='bg-base-200'>
      <Scroll />
      {bookmarkData.length == 0 ? (
        <div className='h-[70vh]'>
          <h1 className='text-center pt-36 font-poppins font-semibold text-2xl'>
            No Bookmarks !!
          </h1>
          <div className='flex justify-center items-center'>
            <BsBookmarkXFill className='w-60 h-60 mt-20' />
          </div>
        </div>
      ) : (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-items-center container mx-auto py-16'>
          {bookmark.map((recipe) => (
            <BookmarkedRecipe
              key={recipe.id}
              recipe={recipe}
              removeFromBookmarks={removeFromBookmarks}></BookmarkedRecipe>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
