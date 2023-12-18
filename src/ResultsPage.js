//ResultsPage.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

import './ResultStyles.css';
import './App.css';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract the searchTerm, lat, and lng from the location state
  const { searchTerm, lat, lng } = location.state || {};

  // Define the function to handle new searches
  const handleSearchSubmit = (newSearchTerm, newLat, newLng) => {
    // Refresh the ResultsPage with the new output
    navigate('/second-page', { replace: true, state: { searchTerm: newSearchTerm, lat: newLat, lng: newLng } });
  };

  return (
    <div className="resultMain">
      <h1>Location Synergy App</h1>
      <div className='resultSearchContainer'>
        {/* Keep the SearchBox so users can search again */}
        <SearchBox onSearchSubmit={handleSearchSubmit} />
      </div>
      {/* Display the results */}
      <div className='resultContent'>
        {searchTerm && <p>Address: {searchTerm}</p>}
        {lat && lng && (
          <>
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;