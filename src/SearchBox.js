// SearchBox.js

import React from 'react';
import './App.css';

const SearchBox = ({ style, onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <form className="searchBar" onSubmit={handleSubmit} style={style}>
      <input
      	type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter a location..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
