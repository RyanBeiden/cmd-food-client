import React, { useState } from 'react';

export const ProfileContext = React.createContext();

function ProfileProvider(props) {
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    const response = await fetch('https://cmd-food.herokuapp.com/profile', {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('cf_token')}`,
      },
    });
    const value = await response.json();
    return setProfile(value);
  };

  return (
    <ProfileContext.Provider value={{ getProfile, profile }}>
      { props.children }
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
