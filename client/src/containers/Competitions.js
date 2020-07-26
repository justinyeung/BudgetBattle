import React from 'react';

import CurrentComps from '../components/competitions/CurrentComps';
import CompsForm from '../components/competitions/CompsForm';
import CompRequests from '../components/competitions/CompRequests';

import { Grid, Container } from '@material-ui/core';

const CompetitionsPage = () => {
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
                    <CompRequests />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CompetitionsPage;
