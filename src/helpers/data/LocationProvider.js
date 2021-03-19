import React from 'react';

export const LocationContext = React.createContext();

function LocationProvider(props) {
  return (
    <LocationContext.Provider value={ 'LocationProvider' }>
      { props.children }
    </LocationContext.Provider>
  );
}

export default LocationProvider;
