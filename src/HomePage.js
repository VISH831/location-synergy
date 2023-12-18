import React from 'react';

// Library for navigation
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/second-page"); // navigate to '/second-page' using your chosen library's function
  };

  return (
    <div>
      <h1>Welcome to My Website!</h1>
      <button onClick={handleClick}>Click to see another page</button>
    </div>
  );
}

export default HomePage;