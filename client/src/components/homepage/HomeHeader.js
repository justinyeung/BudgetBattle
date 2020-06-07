import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Header, Icon } from "semantic-ui-react";

const HomeHeader = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Budget Battle"
      inverted
      style={{
        fontSize: mobile ? "2.5em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "2em",
      }}
    />
    <Header
      as="h2"
      content="Budgeting as a competition."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "1em" : "1.5em",
      }}
    />
    <Button primary size="huge">
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomeHeader.propTypes = {
  mobile: PropTypes.bool,
};

export default HomeHeader;
