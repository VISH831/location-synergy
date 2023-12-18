// Import libraries
import React from 'react';
import SearchBox from './SearchBox';
import { useNavigate } from 'react-router-dom';

// Import home page specific styles
import './HomeStyles.css';
import './App.css';

function HomePage() {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchTerm) => {
    // navigate to '/second-page' using your chosen library's function
    navigate('/second-page', { state: { searchTerm } });
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