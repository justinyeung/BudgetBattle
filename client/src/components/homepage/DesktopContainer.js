import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, Segment } from 'semantic-ui-react';

import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';

const getWidth = () => {
    const isSSR = typeof window === 'undefined';

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
    render() {
        return (
            <Responsive
                getWidth={getWidth}
                minWidth={Responsive.onlyTablet.minWidth}
            >
                <Segment
                    inverted
                    textAlign="center"
                    style={{
                        minHeight: 500,
                        padding: '1em 0em',
                        background: `linear-gradient(to right, #3c3b3f, #605c3c)`,
                    }}
                    vertical
                >
                    <HomeHeader />
                </Segment>
                <HomeBody />
            </Responsive>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

export default DesktopContainer;
