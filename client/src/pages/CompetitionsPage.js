import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import CurrentComps from "../components/competitions/CurrentComps";
import CompsForm from "../components/competitions/CompsForm";
import CompRequests from "../components/competitions/CompRequests";

const CompetitionsPage = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <CurrentComps />
      <Container maxWidth="lg" className="container-spacing">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={5}
        >
          <Grid item md={6} xs={12}>
            <CompsForm />
          </Grid>
          <Grid item md={6} xs={12}>
            <CompRequests />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CompetitionsPage;
