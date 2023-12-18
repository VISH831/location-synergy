// SearchBox.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const SearchBox = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const autoCompleteRef = useRef(null);
  const autocomplete = useRef(null);

  useEffect(() => {
    let script;
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCeGh-2fqlSfx7lMDYhTmpoGXbCUoFF5wg&libraries=places`;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => initializeAutocomplete();
      } else {
        initializeAutocomplete();
      }
    };

    const initializeAutocomplete = () => {
      autocomplete.current = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['address'] }
      );
      autocomplete.current.setFields(['address_components', 'formatted_address', 'geometry']);
      autocomplete.current.addListener('place_changed', onPlaceChanged);
    };

    const onPlaceChanged = () => {
      if (autocomplete.current) {
        const place = autocomplete.current.getPlace();
        setSearchTerm(place.formatted_address);
        if (place.geometry) {
          const coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          console.log(coordinates); // Keep this for debugging purposes
          onSearchSubmit(place.formatted_address, coordinates);
        }
      }
    };

    loadGoogleMapsScript();

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (autocomplete.current) {
        window.google.maps.event.clearInstanceListeners(autocomplete.current);
      }
    };
  }, [onSearchSubmit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm) {
      onSearchSubmit(searchTerm, null); // Null indicates no geocode data available
    }
  };

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <input
        ref={autoCompleteRef}
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