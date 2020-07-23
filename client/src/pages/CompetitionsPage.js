import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import CurrentComps from '../components/competitions/CurrentComps';
import CompsForm from '../components/competitions/CompsForm';
import CompRequests from '../components/competitions/CompRequests';

const CompetitionsPage = () => {
    return (
        <Container maxWidth="lg" className="pages">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item xs={12}>
                    <CurrentComps />
                </Grid>
                <Grid item md={6} xs={12}>
                    <CompsForm />
                </Grid>
                <Grid item md={6} xs={12}>
                    <CompRequests />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CompetitionsPage;
