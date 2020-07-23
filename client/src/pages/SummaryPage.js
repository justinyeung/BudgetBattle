import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { UserType } from '../models/enums';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import SummaryTitle from '../components/summary/SummaryTitle';
import SummaryHeader from '../components/summary/SummaryHeader';
import { getCompetition, setCompLoading } from '../actions/competitionActions';

const SummaryPage = ({ setCompLoading, getCompetition }) => {
    useEffect(() => {
        setCompLoading();
        getCompetition({ id });

        // eslint-disable-next-line
    }, []);

    let { id } = useParams();

    return (
        <Container maxWidth="lg" className="pages">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item xs={12} className="pages-sections">
                    <SummaryHeader />
                </Grid>
                <Grid item md={6} xs={12} className="pages-sections">
                    <SummaryTitle userType={UserType.USER} />
                </Grid>
                <Grid item md={6} xs={12} className="pages-sections">
                    <SummaryTitle userType={UserType.COMPETITOR} />
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
