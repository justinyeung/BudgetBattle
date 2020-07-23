import React from 'react';
import { Responsive, Segment } from 'semantic-ui-react';

import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';

const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const MobileContainer = () => {
    return (
        <Responsive
            getWidth={getWidth}
            maxWidth={Responsive.onlyMobile.maxWidth}
        >
            <Segment inverted vertical className="home-page-jumbotron-mobile">
                <HomeHeader mobile />
            </Segment>

            <HomeBody mobile />
        </Responsive>
    );
};

export default MobileContainer;
