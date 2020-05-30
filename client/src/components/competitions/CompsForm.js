import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendCompRequest } from "../../actions/competitionActions";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getUser } from "../../actions/userActions";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const CompsForm = ({ sendCompRequest, getUser, user: { user } }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [id, setID] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getUser();

    // eslint-disable-next-line
  }, []);

  // snackbar
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  //   Get all accepted friends
  const getAccepted = (friendslist) => {
    return friendslist.filter(
      (friend) =>
        friend.status === "Accepted" &&
        (friend.user2 === user.userID || friend.user1 === user.userID)
    );
  };

  const requestBtn = () => {
    const numMonth = moment(date).format("MM");
    const numYear = moment(date).format("YYYY");
    if (id === "") {
      setSnackbarMsg("No Friend Selected");
      handleClick();
    } else {
      sendCompRequest({ id, numMonth, numYear });
      setID("");
      setDate(new Date());
      setSnackbarMsg("Competition Request Sent");
      handleClick();
    }
  };

  return (
    <div>
      <Box boxShadow={1} className="container-spacing">
        <Typography variant="h6" id="header-title">
          Send Competition Request
        </Typography>
        <Divider />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={5}
          className="send-comp-request"
        >
          <Grid item sm={6} xs={8}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className={classes.formControl}
                variant="inline"
                inputVariant="outlined"
                views={["month", "year"]}
                label="Month and Year"
                value={date}
                autoOk="true"
                onChange={(date) =>
                  date !== null ? setDate(new Date(date)) : setDate(new Date())
                }
                onKeyPress={(e) => {
                  e.key === "Enter" && requestBtn();
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={6} xs={8}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Friend
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={id}
                onChange={(e) => setID(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && requestBtn();
                }}
                label="Select Friend"
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                {user !== null &&
                  getAccepted(user.friends).map(
                    (friend) =>
                      (friend.user2 === user.userID && (
                        <MenuItem value={friend.user1}>
                          {friend.user1name}
                        </MenuItem>
                      )) ||
                      (friend.user1 === user.userID && (
                        <MenuItem value={friend.user2}>
                          {friend.user2name}
                        </MenuItem>
                      ))
                  )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box
          id="purchases-form-submit"
          display="flex"
          flexDirection="row-reverse"
        >
          <Toolbar disableGutters={true}>
            <Button variant="contained" onClick={() => requestBtn()}>
              Send Request
            </Button>
          </Toolbar>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMsg}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

CompsForm.propTypes = {
  sendCompRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { sendCompRequest, getUser })(
  CompsForm
);
