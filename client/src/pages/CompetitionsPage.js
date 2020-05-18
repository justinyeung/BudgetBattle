import React from 'react';

import SetCompetitorForm from '../components/temp/SetCompetitorForm';
import CurrentComps from '../components/competitions/CurrentComps';
import CompsForm from '../components/competitions/CompsForm';
import FriendsList from '../components/friends/FriendsList';

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
