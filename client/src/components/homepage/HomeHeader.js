import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Icon } from 'semantic-ui-react';
import logo from '../../assets/budgetbattlelogo.png';

const HomeHeader = ({ mobile }) => (
    <Container
        text
        className={`home-page-header-${mobile ? 'mobile' : 'desktop'}`}
    >
        <Header
            as="h1"
            content={
                <>
                    <img src={logo} alt={logo} />
                    <p>Budget Battle</p>
                </>
            }
            inverted
        />
        <Header as="h2" content="Budgeting as a competition." inverted />
        <Button primary href="/getstarted" size="huge">
            Get Started
            <Icon name="right arrow" />
        </Button>
    </Container>
);

HomeHeader.propTypes = {
    mobile: PropTypes.bool,
};

export default HomeHeader;
