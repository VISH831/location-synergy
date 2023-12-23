// SearchBox.js

// import React, { useState, useEffect, useRef } from 'react';
// import './App.css';

// const SearchBox = ({ onSearchSubmit }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedOption, setSelectedOption] = useState('');
//   const [coordinates, setCoordinates] = useState(null);
//   const autoCompleteRef = useRef(null);

//   const initializeAutocomplete = () => {
//     if (!autoCompleteRef.current || !window.google || !window.google.maps) return;

//     const autocomplete = new window.google.maps.places.Autocomplete(
//       autoCompleteRef.current,
//       { types: ['address'] }
//     );
//     autocomplete.setFields(['address_components', 'formatted_address', 'geometry']);
//     autocomplete.addListener('place_changed', () => {
//       const place = autocomplete.getPlace();
//       if (place.geometry) {
//         setSearchTerm(place.formatted_address);
//         setCoordinates({
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng()
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     const scriptId = 'google-maps-script';
//     if (!document.getElementById(scriptId) && !window.google) {
//       const script = document.createElement('script');
//       script.id = scriptId;
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCeGh-2fqlSfx7lMDYhTmpoGXbCUoFF5wg&libraries=places&callback=initAutocomplete`;
//       script.async = true;
//       document.body.appendChild(script);
//       window.initAutocomplete = initializeAutocomplete;
//     } else {
//       initializeAutocomplete();
//     }

//     return () => {
//       window.initAutocomplete = undefined;
//       const googleScript = document.getElementById(scriptId);
//       if (googleScript) {
//         document.body.removeChild(googleScript);
//       }
//     };
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (searchTerm && coordinates) {
//       onSearchSubmit(searchTerm, coordinates.lat, coordinates.lng, selectedOption);
//     }
//   };

//   return (
//     <form className="searchBar" onSubmit={handleSubmit}>
//       <input
//         ref={autoCompleteRef}
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Enter a location..."
//       />
//       <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
//         <option value="" disabled>Select an industry</option>
//         <option value="none">None</option>
//         <option value="option1">Option 1</option>
//         <option value="option2">Option 2</option>
//         {/* Add more options as needed */}
//       </select>
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchBox;


import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const SearchBox = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const autoCompleteRef = useRef(null);

  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCeGh-2fqlSfx7lMDYhTmpoGXbCUoFF5wg&libraries=places`;
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
    if (searchTerm && coordinates) {
      onSearchSubmit(searchTerm, coordinates.lat, coordinates.lng, selectedOption);
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
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="" disabled>Select an option</option>
        <option value="none">None</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        {/* More options */}
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
