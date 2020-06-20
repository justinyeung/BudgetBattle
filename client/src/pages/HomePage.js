import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../actions/userActions';
import DesktopContainer from '../components/homepage/DesktopContainer';
import MobileContainer from '../components/homepage/MobileContainer';

const HomePage = ({ getUser }) => {
    useEffect(() => {
        getUser();

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <DesktopContainer />
            <MobileContainer />
        </div>
    );
};

export default connect(null, { getUser })(HomePage);
