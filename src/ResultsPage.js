// ResultsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

import './ResultStyles.css';
import './App.css';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  
  const [demographics, setDemographics] = useState({});
  // Extract searchTerm, lat, lng, and selectedOption from the location state
  const { searchTerm, lat, lng, selectedOption, zipCode } = location.state || {};


  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const response = await fetch('https://location-synergy.s3.amazonaws.com/App_Census_by_ZIP.json');
        if (!response.ok) {
          throw new Error('Demographic data could not be fetched');
        } else {
          const data = await response.json();
          console.log('Fetched data:', data);  // Check the fetched data structure
          const zipData = data[zipCode];
          if (zipData && zipData.length > 0) {
            // Assuming you want the first entry if there are multiple for one ZIP code
            setDemographics(zipData[0]);
          } else {
            console.error(`No demographics found for ZIP code: ${zipCode}`);
          }
        }
      } catch (error) {
        console.error('Error fetching demographic data:', error);
      }
    };
  
    console.log('ZIP Code for fetching:', zipCode); // This should log a valid ZIP code
    if (zipCode) {
      fetchDemographics();
    }
  }, [zipCode]);  


  const handleSearchSubmit = (newSearchTerm, newLat, newLng, newSelectedOption, newZipCode) => {
    navigate('/second-page', { replace: true, state: { searchTerm: newSearchTerm, lat: newLat, lng: newLng, selectedOption: newSelectedOption, zipCode: newZipCode } });
  };  

  return (
    <div className="resultMain">
      <h1>Location Synergy App</h1>
      <div className="resultSearchContainer">
        <SearchBox onSearchSubmit={handleSearchSubmit} />
      </div>
      <div className='resultContent'>
        <div className='topContent'>
          {searchTerm && <p className='addressStyle'>{searchTerm}</p>}
          {lat && lng && (
            <>
              <p className='textStyle'>Latitude: {lat}</p>
              <p className='textStyle'>Longitude: {lng}</p>
            </>
          )}
          {selectedOption && <p className='textStyle'>Selected Industry: {selectedOption}</p>}
        </div>
        <div className='bottomContent'>
          <div className='bottomLeft'>
          </div>
          
          <div className='bottomRight'>
            <p className='bottomText'>ZIPCODE DEMOGRAPHICS</p>
            <div className='bottomTextContent'>
              <div className='censusLeft'>
                <p>Population: {"\t"}{demographics.population}</p>
                <p>Median Age: {"\t"}{demographics.median_age}</p>
                <p>Median Household Income: {"\t"}{demographics.median_household_income}</p>
                <p>Median House Value: {"\t"}{demographics.median_house_value}</p>
                <p>Median Gross Rent: {"\t"}{demographics.median_gross_rent}</p>
                <p>Total Houses: {"\t"}{demographics.total_house}</p>
                <p>Occupied Houses: {"\t"}{demographics.occupied_house}</p>
                <p>Vacant Houses: {"\t"}{demographics.vacant_house}</p>
                <p>Edu. Bachelor's: {"\t"}{demographics.edu_bachelor_percent}%</p>
                <p>Unemployment Rate: {"\t"}{demographics.unemployment_rate}</p>
                <p>Poverty Individual: {"\t"}{demographics.poverty_individual}</p>
                <p>Poverty Rate: {"\t"}{demographics.poverty_rate}</p>
              </div>
              <div className='censusRight'>
                <p>Labor Construction: {"\t"}{demographics.labor_construction}</p>
                <p>Labor Manufacturing: {"\t"}{demographics.labor_manufacturing}</p>
                <p>Labor Wholesale: {"\t"}{demographics.labor_wholesale}</p>
                <p>Labor Retail: {"\t"}{demographics.labor_retail}</p>
                <p>Labor Transportation: {"\t"}{demographics.labor_transportation}</p>
                <p>Labor Information: {"\t"}{demographics.labor_information}</p>
                <p>Labor Finance: {"\t"}{demographics.labor_finance}</p>
                <p>Labor Professional Services: {"\t"}{demographics.labor_professional_services}</p>
                <p>Labor Education: {"\t"}{demographics.labor_education}</p>
                <p>Labor Entertainment: {"\t"}{demographics.labor_entertainment}</p>
                <p>Labor Other Services: {"\t"}{demographics.labor_other_services}</p>
                <p>Labor Public: {"\t"}{demographics.labor_public}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;