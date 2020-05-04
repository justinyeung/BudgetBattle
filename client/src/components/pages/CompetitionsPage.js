import React from 'react';

import LogoutBtn from '../auth/LogoutBtn';
import DeleteUserBtn from '../temp/DeleteUserBtn';

import Competitions from '../subpages/Competitions';
import CurrentCompetition from '../subpages/CurrentCompetition';
import Friends from '../subpages/Friends';

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
