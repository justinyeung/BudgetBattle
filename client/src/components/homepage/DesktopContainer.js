import React from 'react';
import { Responsive, Segment } from 'semantic-ui-react';

import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';

const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const DesktopContainer = () => {
    return (
        <Responsive
            getWidth={getWidth}
            minWidth={Responsive.onlyTablet.minWidth}
        >
            <Segment inverted vertical className="home-page-jumbotron-desktop">
                <HomeHeader />
            </Segment>
            <HomeBody />
        </Responsive>
    );
};

export default DesktopContainer;
