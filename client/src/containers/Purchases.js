import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    getPurchases,
    editPurchase,
    deletePurchase,
    addPurchase,
    setPurchaseLoading,
} from '../actions/purchaseActions';

import PurchaseForm from '../components/purchases/PurchaseForm';
import CurrentPurchases from '../components/purchases/CurrentPurchases';

import { Grid, Container } from '@material-ui/core';

const Purchases = ({
    getPurchases,
    editPurchase,
    deletePurchase,
    addPurchase,
    setPurchaseLoading,
    purchase,
}) => {
    useEffect(() => {
        setPurchaseLoading();
        getPurchases();

        // eslint-disable-next-line
    }, []);

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
                        <PurchaseForm
                            addPurchase={addPurchase}
                            setPurchaseLoading={setPurchaseLoading}
                        />
                    </Grid>
                    <Grid item xs={12} className="pages-sections">
                        <CurrentPurchases
                            getPurchases={getPurchases}
                            editPurchase={editPurchase}
                            deletePurchase={deletePurchase}
                            setPurchaseLoading={setPurchaseLoading}
                            purchase={purchase}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

Purchases.propTypes = {
    addPurchase: PropTypes.func.isRequired,
    setPurchaseLoading: PropTypes.func.isRequired,
    getPurchases: PropTypes.func.isRequired,
    editPurchase: PropTypes.func.isRequired,
    deletePurchase: PropTypes.func.isRequired,
    purchase: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    purchase: state.purchase,
});

export default connect(mapStateToProps, {
    getPurchases,
    editPurchase,
    deletePurchase,
    addPurchase,
    setPurchaseLoading,
})(Purchases);
