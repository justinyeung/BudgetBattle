import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CurrentUser from "../components/user/CurrentUser";
import PurchaseForm from "../components/purchases/PurchaseForm";
import CompRequests from "../components/competitions/CompRequests";
import FriendRequests from "../components/friends/FriendRequests";

const Dashboard = () => {
  return (
    <div>
      <CurrentUser />
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
          <Grid item md={6} xs={12} className="page-grid-spacing">
            <FriendRequests />
          </Grid>
          <Grid item md={6} xs={12} className="page-grid-spacing">
            <CompRequests />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
