import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Add this line to import the module
import 'react-firebase-hooks/auth'; // Add this line to import the module
import { auth } from './firebaseConfig';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
