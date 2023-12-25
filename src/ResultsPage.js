// ResultsPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

import './ResultStyles.css';
import './App.css';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract searchTerm, lat, lng, and selectedOption from the location state
  const { searchTerm, lat, lng, selectedOption } = location.state || {};

  const handleSearchSubmit = (newSearchTerm, newLat, newLng, newSelectedOption) => {
    navigate('/second-page', { replace: true, state: { searchTerm: newSearchTerm, lat: newLat, lng: newLng, selectedOption: newSelectedOption } });
  };

  return (
    <div className="resultMain">
      <h1>Location Synergy App</h1>
      <div className="resultSearchContainer">
        <SearchBox onSearchSubmit={handleSearchSubmit} />
      </div>
      <div className='resultContent'>
        {searchTerm && <p>Address: {searchTerm}</p>}
        {lat && lng && (
          <>
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
          </>
        )}
        {selectedOption && <p>Selected Option: {selectedOption}</p>}
      </div>
    </div>
  );
}

export default ResultsPage;