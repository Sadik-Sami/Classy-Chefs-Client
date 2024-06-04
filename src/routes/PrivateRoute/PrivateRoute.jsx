import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoadingPage from '../../layouts/LoadingPage';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  if (loading) {
    return <LoadingPage />;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate
      to='/login'
      state={{ from: location }}
      replace
    />
  );
};

export default PrivateRoute;
