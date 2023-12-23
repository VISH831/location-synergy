// HomePage.js

import React from 'react';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';
import './HomeStyles.css';
import './App.css';

function HomePage() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchTerm, lat, lng, selectedOption) => {
    navigate('/second-page', { state: { searchTerm, lat, lng, selectedOption } });
  };

  return (
    <header className="homeMain">
      <div>
        <h1 className="homeTitle">Location Synergy App</h1>
        <div className="homeSearchContainer">
          <SearchBox onSearchSubmit={handleSearchSubmit} />
        </div>
      </div>
    </header>
  );
}

export default HomePage;
