import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";
import PersonIcon from "@material-ui/icons/Person";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import CheckIcon from "@material-ui/icons/Check";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import GroupIcon from "@material-ui/icons/Group";
import Grid from "@material-ui/core/Grid";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SettingsIcon from "@material-ui/icons/Settings";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

//drawer
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { logout, getUser } from "../../actions/userActions";
import { clearPurchases } from "../../actions/purchaseActions";
import { clearComps } from "../../actions/competitionActions";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  loginButton: {
    padding: "3px",
  },
  loginButtonText: {
    textTransform: "capitalize",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

// menu
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {},
}))(MenuItem);

const PrimarySearchAppBar = ({
  user: { user },
  logout,
  getUser,
  clearPurchases,
  clearComps,
}) => {
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/" id="drawer-link">
          <ListItem button key={"Home"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {localStorage.getItem("isLoggedIn") || user !== null ? (
        <div>
          <List>
            <Link to="/dashboard" id="drawer-link">
              <ListItem button key={"Dashboard"}>
                <ListItemIcon>
                  <AppsIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
            </Link>
            <Link to="/friends" id="drawer-link">
              <ListItem button key={"Friends"}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={"Friends"} />
              </ListItem>
            </Link>
            <Link to="/purchases" id="drawer-link">
              <ListItem button key={"Purchases"}>
                <ListItemIcon>
                  <LocalAtmIcon />
                </ListItemIcon>
                <ListItemText primary={"Purchases"} />
              </ListItem>
            </Link>
            <Link to="/competitions" id="drawer-link">
              <ListItem button key={"Competitions"}>
                <ListItemIcon>
                  <EmojiEventsIcon />
                </ListItemIcon>
                <ListItemText primary={"Competitions"} />
              </ListItem>
            </Link>
          </List>
        </div>
      ) : (
        <div>
          <List>
            <Link to="/getstarted" id="drawer-link">
              <ListItem button key={"Get Started"}>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary={"Get Started"} />
              </ListItem>
            </Link>
            <Link to="/login" id="drawer-link">
              <ListItem button key={"Login"}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
          </List>
        </div>
      )}
    </div>
  );

  const logoutButton = () => {
    handleClose();
    logout();
    clearPurchases();
    clearComps();
  };

  const renderMenu = (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {(localStorage.getItem("isLoggedIn") || user !== null) && (
        <div>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </StyledMenuItem>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => logoutButton()}>
            <ListItemIcon>
              <LockOpenIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
        </div>
      )}
    </StyledMenu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer("left", true)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <div>
                    <React.Fragment key={"left"}>
                      <SwipeableDrawer
                        anchor={"left"}
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                        onOpen={toggleDrawer("left", true)}
                      >
                        {list("left")}
                      </SwipeableDrawer>
                    </React.Fragment>
                  </div>
                </Grid>
                <Grid item>
                  <Typography variant="h6" noWrap>
                    Budget Battle
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {localStorage.getItem("isLoggedIn") || user !== null ? (
                <IconButton onClick={handleClick} edge="end" color="inherit">
                  <Avatar>
                    {user && user.name && user.name.substring(0, 1)}
                  </Avatar>
                  <ArrowDropDownIcon />
                </IconButton>
              ) : (
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item className={classes.title}>
                    <Button href="/getstarted" color="inherit">
                      <Typography variant="subtitle1" noWrap>
                        Get Started
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      href="/login"
                      color="inherit"
                      variant="outlined"
                      className={classes.loginButton}
                    >
                      <Typography
                        variant="subtitle1"
                        noWrap
                        className={classes.loginButtonText}
                      >
                        Login
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

PrimarySearchAppBar.propTypes = {
  logout: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  clearPurchases: PropTypes.func.isRequired,
  clearComps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  logout,
  getUser,
  clearPurchases,
  clearComps,
})(PrimarySearchAppBar);
