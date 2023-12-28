// HomePage.js
import React from 'react';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';
import './HomeStyles.css';
import './App.css';

function HomePage() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchTerm, lat, lng, selectedOption, zipCode) => {
    navigate('/second-page', { state: { searchTerm, lat, lng, selectedOption, zipCode } });
  };

  return (
    <header className="homeMain">
      <div className="homeContainer">
        <h1 className="homeTitle">Location Synergy App</h1>
        <SearchBox onSearchSubmit={handleSearchSubmit} />
      </div>
    </header>
  );
}

export default HomePage;