import React from 'react';

import LogoutBtn from '../auth/LogoutBtn';
import DeleteUserBtn from '../temp/DeleteUserBtn';

import SetCompetitorForm from '../temp/SetCompetitorForm';
import CurrentPurchases from '../purchases/CurrentPurchases';

const CompetitionsPage = () => {
  return (
    <div>
      <div style={{ padding: '1rem' }}>
          <SetCompetitorForm />
      </div>
      <div style={{ padding: '1rem' }}>
          <CurrentPurchases/>
      </div>
    </div>
  );
}

export default CompetitionsPage;
