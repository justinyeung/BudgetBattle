import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CurrentUser from "../components/user/CurrentUser";
import PurchaseForm from "../components/purchases/PurchaseForm";
import CompRequests from "../components/competitions/CompRequests";
import FriendRequests from "../components/friends/FriendRequests";
import AcceptCompForm from "../components/temp/AcceptCompForm";

const Dashboard = () => {
  return (
    <div>
      <CurrentUser />
      <PurchaseForm />
      <Container maxWidth="lg" className="container-spacing">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={5}
        >
          <Grid item md={6} xs={12}>
            <FriendRequests />
          </Grid>
          <Grid item md={6} xs={12}>
            <CompRequests />
          </Grid>
        </Grid>
      </Container>
      <AcceptCompForm />
    </div>
  );
};

export default Dashboard;
