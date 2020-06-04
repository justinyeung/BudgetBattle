import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CurrentComps from "../components/competitions/CurrentComps";
import CompsForm from "../components/competitions/CompsForm";
import CompRequests from "../components/competitions/CompRequests";

const CompetitionsPage = () => {
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
            <CurrentComps />
          </Grid>
          <Grid item md={6} xs={12} className="page-grid-spacing">
            <CompsForm />
          </Grid>
          <Grid item md={6} xs={12} className="page-grid-spacing">
            <CompRequests />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CompetitionsPage;
