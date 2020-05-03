import React from 'react';

import CompsForm from '../competitions/CompsForm';
import CurrentComps from '../competitions/CurrentComps';
import AcceptCompForm from '../temp/AcceptCompForm';


const Competitions = () => {
  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <CompsForm/>
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentComps/>
      </div>
      <div style={{ padding: '1rem' }}>
        <AcceptCompForm/>
      </div>
    </div>
  );
}

export default Competitions;
