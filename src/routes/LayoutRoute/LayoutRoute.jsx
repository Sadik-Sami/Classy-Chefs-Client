import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Login from '../../auth/Login/Login';
import HomeLayout from '../../layouts/HomeLayout';
import Chefs from '../../components/chefs/chefs';
import Error from '../../components/Shared/Error/Error';
import Recipies from '../../components/Recipies/Recipies';
import RecipePage from '../../components/RecipePage/RecipePage';
import About from '../../components/About/About';
import Blog from '../../components/Blog/Blog';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import LoadingPage from '../../layouts/LoadingPage';
import { bookmarkedRecipiesLoader } from '../../loader/loader';
import Bookmarks from '../../components/Bookmarks/Bookmarks';
import Profile from '../../auth/Profile/Profile';

const LayoutRoute = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <HomeLayout />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/chefs',
        element: (
          <PrivateRoute>
            <Chefs />
          </PrivateRoute>
        ),
        loader: () => fetch('https://classy-chefs-server.vercel.app/chefs'),
      },
      {
        path: '/recipies',
        element: (
          <PrivateRoute>
            <Recipies />
          </PrivateRoute>
        ),
        loader: () => fetch('https://classy-chefs-server.vercel.app/recipies'),
      },
      {
        path: '/recipe/:id',
        loader: ({ params }) =>
          fetch(`https://classy-chefs-server.vercel.app/recipies/${params.id}`),
        element: (
          <PrivateRoute>
            <RecipePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/chef/:id',
        loader: ({ params }) =>
          fetch(`https://classy-chefs-server.vercel.app/chef/${params.id}`),
        element: (
          <PrivateRoute>
            <Recipies />
          </PrivateRoute>
        ),
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/blogs',
        element: <Blog />,
      },
      {
        path: '/loading',
        element: <LoadingPage />,
      },
      {
        path: '/bookmarks',
        element: <Bookmarks />,
        loader: bookmarkedRecipiesLoader,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default LayoutRoute;
