import React from 'react';

export const KrogerContext = React.createContext();

function KrogerProvider(props) {
  return (
    <KrogerContext.Provider value={ 'KrogerProvider' }>
      { props.children }
    </KrogerContext.Provider>
  );
}

export default KrogerProvider;
