import React from 'react';

import LogoutBtn from '../auth/LogoutBtn';
import DeleteUserBtn from '../temp/DeleteUserBtn';

import Competitions from '../subpages/Competitions';
import CurrentCompetition from '../subpages/CurrentCompetition';
import Friends from '../subpages/Friends';

const Dashboard = () => {
  return (
    <div>
      <div style={{ padding: '1rem' }}>
        <LogoutBtn />
        <DeleteUserBtn />
      </div>
      <div style={{ padding: '1rem' }}>
        <Friends/>
      </div>
      <div style={{ padding: '1rem' }}>
        <Competitions/>
      </div>
      <div style={{ padding: '1rem' }}>
        <CurrentCompetition/>
      </div>
    </div>
  );
}

export default Dashboard;
