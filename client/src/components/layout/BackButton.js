import React from 'react';
import { withRouter } from 'react-router-dom';

import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const GoBack = ({ history }) => (
    <Container maxWidth="lg" className="back-button-spacing">
        <Button
            className="component-box"
            variant="contained"
            onClick={() => history.goBack()}
        >
            <KeyboardBackspaceRoundedIcon fontSize="large" /> Go Back
        </Button>
    </Container>
);

export default withRouter(GoBack);
