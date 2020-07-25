import React from 'react';

import PurchaseForm from '../components/purchases/PurchaseForm';
import CompRequests from '../components/competitions/CompRequests';
import FriendRequests from '../components/friends/FriendRequests';

import { Grid, Container } from '@material-ui/core';

const Dashboard = () => {
    return (
        <div>
            <Container maxWidth="lg" className="pages">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item xs={12} className="pages-sections">
                        <PurchaseForm />
                    </Grid>
                    <Grid item md={6} xs={12} className="pages-sections">
                        <FriendRequests />
                    </Grid>
                    <Grid item md={6} xs={12} className="pages-sections">
                        <CompRequests />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Dashboard;
