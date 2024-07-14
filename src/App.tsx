import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Login from './components/Login';
import PrivateRoute from './privateRoute';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard page
        const userEmail = user.email;
        const userName = userEmail?.split('@')[0];
        navigate('/dashboard', { state: { userName } });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
