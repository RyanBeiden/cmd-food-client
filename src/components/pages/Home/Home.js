import React from 'react';

function Home(props) {
  return (
    <div>
      {
        props.history.location.pathname === '/authentication'
          ? <h1>Authentication Home</h1>
          : <h1>Authorized Home</h1>
      }
    </div>
  );
}

export default Home;
