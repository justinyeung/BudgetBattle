import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CheckIcon from '@material-ui/icons/Check';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import GroupIcon from '@material-ui/icons/Group';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../assets/budgetbattlelogo.png';
import { logout, setUserLoading } from '../actions/userActions';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    MenuItem,
    Menu,
    Grid,
    Avatar,
    Button,
    SwipeableDrawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Container,
    LinearProgress,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

// menu
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {},
}))(MenuItem);

const PrimarySearchAppBar = ({
    user: { user, userLoading },
    purchase: { purchaseLoading },
    competition: { compLoading },
    search: { searchLoading },
    profile: { profileLoading },
    logout,
    setUserLoading,
}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [logoutClicked, setLogoutClicked] = useState(false);

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setLogoutClicked(false);
    };

    // menu
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
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
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const logoutButton = () => {
        setUserLoading();
        handleMenuClose();
        logout();
        setLogoutClicked(true);
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {!userLoading && user !== null && (
                <div>
                    <List>
                        <Link to="/" className="menu-drawer-link">
                            <ListItem button key={'Home'}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </Link>
                        <Link to="/getstarted" className="menu-drawer-link">
                            <ListItem button key={'Get Started'}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Get Started'} />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/dashboard" className="menu-drawer-link">
                            <ListItem button key={'Dashboard'}>
                                <ListItemIcon>
                                    <AppsIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>
                        </Link>
                        <Link to="/friends" className="menu-drawer-link">
                            <ListItem button key={'Friends'}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Friends'} />
                            </ListItem>
                        </Link>
                        <Link to="/purchases" className="menu-drawer-link">
                            <ListItem button key={'Purchases'}>
                                <ListItemIcon>
                                    <LocalAtmIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Purchases'} />
                            </ListItem>
                        </Link>
                        <Link to="/battles" className="menu-drawer-link">
                            <ListItem button key={'Battles'}>
                                <ListItemIcon>
                                    <EmojiEventsIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Battles'} />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            )}
            {!userLoading && user === null && (
                <div>
                    <List>
                        <Link to="/" className="menu-drawer-link">
                            <ListItem button key={'Home'}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/getstarted" className="menu-drawer-link">
                            <ListItem button key={'Get Started'}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Get Started'} />
                            </ListItem>
                        </Link>
                        <Link to="/login" className="menu-drawer-link">
                            <ListItem button key={'Login'}>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Login'} />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            )}
        </div>
    );

    const renderMenu = (
        <StyledMenu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            {!userLoading && user !== null && (
                <div>
                    <Link
                        to={`/profile/${user && user.userID}`}
                        className="menu-drawer-link"
                    >
                        <StyledMenuItem onClick={handleMenuClose}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </StyledMenuItem>
                    </Link>
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

    const renderSnackbar = (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={!userLoading && user === null && logoutClicked}
            autoHideDuration={3000}
            onClose={handleSnackClose}
            message="Logout Successful"
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
        />
    );

    return (
        <div className="navbar">
            <AppBar elevation={1} position="fixed">
                <Toolbar>
                    <Container maxWidth="lg">
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
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={toggleDrawer('left', true)}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <React.Fragment key={'left'}>
                                            <SwipeableDrawer
                                                anchor={'left'}
                                                open={state['left']}
                                                onClose={toggleDrawer(
                                                    'left',
                                                    false
                                                )}
                                                onOpen={toggleDrawer(
                                                    'left',
                                                    true
                                                )}
                                            >
                                                {list('left')}
                                            </SwipeableDrawer>
                                        </React.Fragment>
                                    </Grid>
                                    <Grid item>
                                        <img src={logo} />
                                    </Grid>
                                    <Grid item>
                                        <Link to="/">
                                            <Typography variant="h6" noWrap>
                                                Budget Battle
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                {user !== null && (
                                    <IconButton
                                        onClick={handleMenuClick}
                                        edge="end"
                                        color="inherit"
                                    >
                                        <Avatar>
                                            {user &&
                                                user.name &&
                                                user.name.substring(0, 1)}
                                        </Avatar>
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                )}
                                {user === null && (
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-end"
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Grid item className="navbar-top-right">
                                            <Link
                                                to="/getstarted"
                                                className="navbar-link"
                                            >
                                                <Button color="inherit">
                                                    <Typography
                                                        variant="subtitle1"
                                                        noWrap
                                                    >
                                                        Get Started
                                                    </Typography>
                                                </Button>
                                            </Link>
                                        </Grid>
                                        <Grid item className="navbar-top-right">
                                            <Link
                                                to="/login"
                                                className="navbar-link"
                                            >
                                                <Button
                                                    color="inherit"
                                                    variant="outlined"
                                                    className="navbar-login-button"
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        noWrap
                                                    >
                                                        Login
                                                    </Typography>
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
                <div className="navbar-loading">
                    {(userLoading ||
                        purchaseLoading ||
                        compLoading ||
                        profileLoading ||
                        searchLoading) && <LinearProgress />}
                </div>
            </AppBar>

            {renderMenu}
            {renderSnackbar}
        </div>
    );
};

PrimarySearchAppBar.propTypes = {
    user: PropTypes.object.isRequired,
    purchase: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    purchase: state.purchase,
    competition: state.competition,
    search: state.search,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    logout,
    setUserLoading,
})(PrimarySearchAppBar);
