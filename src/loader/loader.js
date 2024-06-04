import { getShoppingCart } from '../utils/fakedb';

export const bookmarkedRecipiesLoader = async () => {
  const loadedJobs = await fetch('https://classy-chefs-server.vercel.app/recipies');
  const jobs = await loadedJobs.json();
  const appliedJobs = getShoppingCart();
  const saved = [];
  for (const id in appliedJobs) {
    const addedProduct = jobs.find((pd) => pd.id == id);
    if (addedProduct) {
      const quantity = appliedJobs[id];
      addedProduct.quantity = quantity;
      saved.push(addedProduct);
    }
  }
  return saved;
};
