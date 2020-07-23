import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import PurchaseForm from '../components/purchases/PurchaseForm';
import CurrentPurchases from '../components/purchases/CurrentPurchases';

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
                    <Grid item xs={12}>
                        <PurchaseForm />
                    </Grid>
                    <Grid item xs={12}>
                        <CurrentPurchases />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default PurchasePage;
