import { useEffect } from 'react';
const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title}-Classy Chefs`;
  }, [title]);
};

export default useTitle;
