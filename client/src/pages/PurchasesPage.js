import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import PurchaseForm from "../components/purchases/PurchaseForm";
import CurrentPurchases from "../components/purchases/CurrentPurchases";

const PurchasePage = () => {
  return (
    <div>
      <Container maxWidth="lg" className="container-spacing">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} className="page-grid-spacing">
            <PurchaseForm />
          </Grid>
          <Grid item xs={12} className="page-grid-spacing">
            <CurrentPurchases />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default PurchasePage;
