import React from 'react';
import Dropdown from './Dropdown';

const LocationSelector = ({ statesAndCities, selectedState, setSelectedState, selectedCity, setSelectedCity }) => {
  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    setSelectedCity(statesAndCities[newState][0]); 
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="location-selector">
      <Dropdown
        label="State:"
        options={Object.keys(statesAndCities)}
        value={selectedState}
        onChange={handleStateChange}
      />
      <Dropdown
        label="City:"
        options={statesAndCities[selectedState]}
        value={selectedCity}
        onChange={handleCityChange}
      />
    </div>
  );
};

export default LocationSelector;
