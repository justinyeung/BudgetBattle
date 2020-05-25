import React from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import FriendForm from "../components/temp/FriendForm";
import FriendsList from "../components/friends/FriendsList";
import FriendRequests from "../components/friends/FriendRequests";

const FriendsPage = () => {
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <FriendForm />
      </div>
      <Container maxWidth="md" className="container-spacing">
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
            <FriendsList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FriendsPage;
