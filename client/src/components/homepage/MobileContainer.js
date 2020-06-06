import React, { Component } from "react";
import PropTypes from "prop-types";
import { Responsive, Segment } from "semantic-ui-react";

import HomepageHeading from "./HomepageHeading";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class MobileContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Segment
          inverted
          textAlign="center"
          style={{
            minHeight: 350,
            padding: "1em 0em",
            background: `linear-gradient(to right, #3c3b3f, #605c3c)`,
          }}
          vertical
        >
          <HomepageHeading mobile />
        </Segment>

        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

export default MobileContainer;
