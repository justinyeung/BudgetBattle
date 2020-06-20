import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import UserSummary from '../components/summary/UserSummary';
import CompetitorSummary from '../components/summary/CompetitorSummary';
import { getCompetition, setCompLoading } from '../actions/competitionActions';

const SummaryPage = ({ setCompLoading, getCompetition }) => {
    useEffect(() => {
        setCompLoading();
        getCompetition({ id });

        // eslint-disable-next-line
    }, []);

    let { id } = useParams();

    return (
        <Container maxWidth="lg" className="container-spacing">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item md={6} xs={12} className="grid-spacing">
                    <UserSummary />
                </Grid>
                <Grid item md={6} xs={12} className="grid-spacing">
                    <CompetitorSummary />
                </Grid>
            </Grid>
        </Container>
    );
};

SummaryPage.propTypes = {
    setCompLoading: PropTypes.func.isRequired,
    getCompetition: PropTypes.func.isRequired,
};

export default connect(null, {
    setCompLoading,
    getCompetition,
})(SummaryPage);
