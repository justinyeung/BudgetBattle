import React from 'react';

import SetCompetitorForm from '../temp/SetCompetitorForm';
import CurrentComps from '../competitions/CurrentComps';
import CompsForm from '../competitions/CompsForm';
import FriendsList from '../friends/FriendsList';

const CompetitionsPage = () => {
  return (
    <div>
      <div style={{ padding: '1rem' }}>
          <FriendsList />
      </div>
      <div style={{ padding: '1rem' }}>
          <SetCompetitorForm />
      </div>
      <div style={{ padding: '1rem' }}>
          <CompsForm />
      </div>
      <div style={{ padding: '1rem' }}>
          <CurrentComps />
      </div>
    </div>
  );
}

export default CompetitionsPage;
