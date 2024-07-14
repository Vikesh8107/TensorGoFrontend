import React from 'react';
import Login from '../components/Login';

const Home: React.FC = () => {
  const gradientTextStyle = {
    fontWeight: 'bold',
    background: 'linear-gradient(to right, red, orange)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
  };

  const tensorGoGradientStyle = {
    fontWeight: 'bold',
    background: 'linear-gradient(to right, purple, violet)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
  };

  return (
    <div>
      <h1 style={gradientTextStyle}>
        Welcome to <span style={tensorGoGradientStyle}>TensorGo</span>
      </h1>
      <Login />
    </div>
  );
};

export default Home;
