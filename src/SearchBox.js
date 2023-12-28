// SearchBox.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchStyles.css';

const SearchBox = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [addressComponents, setAddressComponents] = useState(null); // State to store address components
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const autoCompleteRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const searchBarClass = isHomePage ? 'searchBarHome' : 'searchBarResults';

  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setIsScriptLoaded(true);
    };
  };

  useEffect(() => {
    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (isScriptLoaded && autoCompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['address'] }
      );
      autocomplete.setFields(['address_components', 'formatted_address', 'geometry']);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setSearchTerm(place.formatted_address);
          setAddressComponents(place.address_components); // Save address components in state
          setCoordinates({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
        }
      });
    }
  }, [isScriptLoaded]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Use the state variable `addressComponents` to find the ZIP code
    const zipCode = addressComponents?.find(component => component.types.includes('postal_code'))?.long_name;
    if (searchTerm && coordinates && zipCode) {
      onSearchSubmit(searchTerm, coordinates.lat, coordinates.lng, selectedOption, zipCode);
    }
  };

  return (
    <form className={`searchBar ${searchBarClass}`} onSubmit={handleSubmit}>
      <div className="searchInputGroup">
        <input
          ref={autoCompleteRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a location..."
        />
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="" disabled>Select an industry</option>
          <option value="none">None</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          {/* More options */}
        </select>
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default SearchBox;
