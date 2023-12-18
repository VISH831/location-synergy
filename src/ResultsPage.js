import React from 'react';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

import './ResultStyles.css';
import './App.css';

function ResultsPage() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchTerm) => {
    // navigate to '/second-page' using your chosen library's function
    navigate('/second-page', { state: { searchTerm } });
};

  return (
    <header className="resultMain">
    <div>
      <h1>Location Synergy App</h1>
      <div className='resultSearchContainer' >
        <SearchBox onSearchSubmit={handleSearchSubmit} />
      </div>
    </div>
    </header>
  );
}

export default ResultsPage;