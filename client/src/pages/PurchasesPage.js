import React from 'react';

import PurchaseForm from '../components/purchases/PurchaseForm';
import CurrentPurchases from '../components/purchases/CurrentPurchases';

import { Grid, Container } from '@material-ui/core';

const PurchasePage = () => {
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
                    <Grid item xs={12} className="pages-sections">
                        <CurrentPurchases />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default PurchasePage;
