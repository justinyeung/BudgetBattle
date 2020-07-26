import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    acceptComp,
    rejectOrDeleteComp,
    getInPendingComp,
    setCompLoading,
} from '../actions/competitionActions';

import CurrentComps from '../components/competitions/CurrentComps';
import CompsForm from '../components/competitions/CompsForm';
import CompRequests from '../components/competitions/CompRequests';

import { Grid, Container } from '@material-ui/core';

const Competitions = ({
    acceptComp,
    rejectOrDeleteComp,
    getInPendingComp,
    setCompLoading,
    competition,
}) => {
    return (
        <Container maxWidth="lg" className="pages">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item xs={12} className="pages-sections">
                    <CurrentComps />
                </Grid>
                <Grid item md={6} xs={12} className="pages-sections">
                    <CompsForm />
                </Grid>
                <Grid item md={6} xs={12} className="pages-sections">
                    <CompRequests
                        acceptComp={acceptComp}
                        rejectOrDeleteComp={rejectOrDeleteComp}
                        getInPendingComp={getInPendingComp}
                        setCompLoading={setCompLoading}
                        competition={competition}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

Competitions.propTypes = {
    competition: PropTypes.object.isRequired,
    getInPendingComp: PropTypes.func.isRequired,
    acceptComp: PropTypes.func.isRequired,
    rejectOrDeleteComp: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    competition: state.competition,
});

export default connect(mapStateToProps, {
    getInPendingComp,
    acceptComp,
    rejectOrDeleteComp,
    setCompLoading,
})(Competitions);
