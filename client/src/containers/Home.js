import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUser, setUserLoading } from '../actions/userActions';
import DesktopContainer from '../components/homepage/DesktopContainer';
import MobileContainer from '../components/homepage/MobileContainer';

const HomePage = ({ getUser, setUserLoading }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
        setUserLoading();
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

HomePage.propTypes = {
    getUser: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
};

export default connect(null, { getUser, setUserLoading })(HomePage);
