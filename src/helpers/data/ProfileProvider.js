import React from 'react';

export const ProfileContext = React.createContext();

function ProfileProvider(props) {
  return (
    <ProfileContext.Provider value={ 'ProfileProvider' }>
      { props.children }
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
