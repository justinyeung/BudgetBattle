import React, { Component } from "react";
import PropTypes from "prop-types";
import { Responsive, Segment, Visibility } from "semantic-ui-react";

import HomepageHeading from "./HomepageHeading";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false}>
          <Segment
            inverted
            textAlign="center"
            style={{
              minHeight: 700,
              padding: "1em 0em",
              background: `linear-gradient(to right, #3c3b3f, #605c3c)`,
            }}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

export default DesktopContainer;
