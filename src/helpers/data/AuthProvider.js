import React from 'react';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  return (
    <AuthContext.Provider>
      { props.children }
    </AuthContext.Provider>
  );
}

export default AuthProvider;
