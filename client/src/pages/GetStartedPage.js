import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { getUser } from "../actions/userActions";

const GetStartedPage = ({ getUser, user: { user } }) => {
  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Container maxWidth="lg" className="container-spacing">
        {user ? <p>Logged In</p> : <p>Not Logged In</p>}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} className="grid-spacing">
            <Box boxShadow={1} className="container-spacing component-box">
              <Typography variant="h6" id="header-title">
                Sign in using Facebook or Google
              </Typography>
              <Divider />
              <Container className="container-spacing">
                <p>
                  Use your Facebook or Google account to access Budget Battle
                </p>
                <Button href="/login" variant="contained">
                  Go to Sign In
                </Button>
              </Container>
            </Box>
          </Grid>
          <Grid item xs={12} className="grid-spacing">
            <Box boxShadow={1} className="container-spacing component-box">
              <Typography variant="h6" id="header-title">
                Log and keep track of your purchases
              </Typography>
              <Divider />
              <Container className="container-spacing">
                <p>
                  Input all your purchases to keep track of what you bought,
                  where you bought it, when you bought it and how much you
                  spent.
                </p>
                <p>
                  Easily keep track of your purchases and sort by Date,
                  Location, Category and Amount.
                </p>
                <Button href="/login" variant="contained">
                  Go to Purchases
                </Button>
              </Container>
            </Box>
          </Grid>
          <Grid item xs={12} className="grid-spacing">
            <Box boxShadow={1} className="container-spacing component-box">
              <Typography variant="h6" id="header-title">
                Connect with your Friends
              </Typography>
              <Divider />
              <Container className="container-spacing">
                <p>
                  Add Friends on Budget Battle to meet your budgeting goals
                  together!
                </p>
                <p>
                  Easily search for your friends and send them a friend request.
                </p>
                <p>If they find you first, accept their request!</p>
                <Button href="/login" variant="contained">
                  Go to Friends
                </Button>
              </Container>
            </Box>
          </Grid>
          <Grid item xs={12} className="grid-spacing">
            <Box boxShadow={1} className="container-spacing component-box">
              <Typography variant="h6" id="header-title">
                Compete with your friends in Monthly Battles
              </Typography>
              <Divider />
              <Container className="container-spacing">
                <p>Compete with your friends to see who can stay on budget</p>
                <p>Compare your purchases!</p>
                <p>See who can meet their goal by the end of the month.</p>
                <Button href="/login" variant="contained">
                  Go to Battles
                </Button>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

GetStartedPage.propTypes = {
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUser })(GetStartedPage);
