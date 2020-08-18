import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { UserType } from '../models/enums';

import SummaryTitle from '../components/summary/SummaryTitle';
import SummaryHeader from '../components/summary/SummaryHeader';
import { getCompetition, setCompLoading } from '../actions/competitionActions';

import { Grid, Container } from '@material-ui/core';

const SummaryPage = ({ setCompLoading, getCompetition, user, competition }) => {
    let { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        setCompLoading();
        getCompetition({ id });

        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="lg" className="pages">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item xs={12} className="pages-sections">
                    <SummaryHeader user={user} competition={competition} />
                </Grid>
                <Grid item md={6} xs={12} className="pages-sections">
                    <SummaryTitle
                        userType={UserType.USER}
                        user={user}
                        competition={competition}
                    />
                </Grid>
                <Grid item md={6} xs={12} className="pages-sections">
                    <SummaryTitle
                        userType={UserType.COMPETITOR}
                        user={user}
                        competition={competition}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

SummaryPage.propTypes = {
    setCompLoading: PropTypes.func.isRequired,
    getCompetition: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps, {
    setCompLoading,
    getCompetition,
})(SummaryPage);
