import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import SetCompetitorForm from "../components/temp/SetCompetitorForm";
import CurrentComps from "../components/competitions/CurrentComps";
import CompsForm from "../components/competitions/CompsForm";
import CompRequests from "../components/competitions/CompRequests";

const CompetitionsPage = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <Container maxWidth="lg" id="purchases-form">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={5}
          className="container-spacing"
        >
          <Grid item md={6} xs={12}>
            <Box boxShadow={1} className="container-spacing">
              <CompsForm />
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box boxShadow={1} className="container-spacing">
              <CompRequests />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" className="container-spacing">
        <Box boxShadow={1} className="container-spacing">
          <CurrentComps />
        </Box>
      </Container>
    </div>
  );
};

export default CompetitionsPage;
