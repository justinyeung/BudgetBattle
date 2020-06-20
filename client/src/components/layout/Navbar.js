import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CheckIcon from '@material-ui/icons/Check';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import GroupIcon from '@material-ui/icons/Group';
import Grid from '@material-ui/core/Grid';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import { logout, getUser, setUserLoading } from '../../actions/userActions';
import { clearPurchases } from '../../actions/purchaseActions';
import { clearComps } from '../../actions/competitionActions';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    loginButton: {
        padding: '3px',
    },
    loginButtonText: {
        textTransform: 'capitalize',
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
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
    logout,
    getUser,
    clearPurchases,
    clearComps,
    setUserLoading,
}) => {
    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, []);

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
        clearPurchases();
        clearComps();
        setLogoutClicked(true);
        // handleSnackClick();
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
                        <Link to="/" id="drawer-link">
                            <ListItem button key={'Home'}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </Link>
                        <Link to="/getstarted" id="drawer-link">
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
                        <Link to="/dashboard" id="drawer-link">
                            <ListItem button key={'Dashboard'}>
                                <ListItemIcon>
                                    <AppsIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Dashboard'} />
                            </ListItem>
                        </Link>
                        <Link to="/friends" id="drawer-link">
                            <ListItem button key={'Friends'}>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Friends'} />
                            </ListItem>
                        </Link>
                        <Link to="/purchases" id="drawer-link">
                            <ListItem button key={'Purchases'}>
                                <ListItemIcon>
                                    <LocalAtmIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Purchases'} />
                            </ListItem>
                        </Link>
                        <Link to="/battles" id="drawer-link">
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
                        <Link to="/" id="drawer-link">
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
                        <Link to="/getstarted" id="drawer-link">
                            <ListItem button key={'Get Started'}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Get Started'} />
                            </ListItem>
                        </Link>
                        <Link to="/login" id="drawer-link">
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
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            {!userLoading && user !== null && (
                <div>
                    <StyledMenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </StyledMenuItem>
                    <StyledMenuItem onClick={handleMenuClose}>
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
        <div className={classes.grow}>
            <AppBar elevation={1} position="fixed" className="appbar">
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
                                            className={classes.menuButton}
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={toggleDrawer('left', true)}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <div>
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
                                        <Grid item className={classes.title}>
                                            <Link
                                                to="/getstarted"
                                                className="navbar-link"
                                            >
                                                <Button color="inherit">
                                                    <Typography
                                                        variant="subtitle1"
                                                        noWrap
                                                        className={
                                                            classes.loginButtonText
                                                        }
                                                    >
                                                        Get Started
                                                    </Typography>
                                                </Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link
                                                to="/login"
                                                className="navbar-link"
                                            >
                                                <Button
                                                    color="inherit"
                                                    variant="outlined"
                                                    className={
                                                        classes.loginButton
                                                    }
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        noWrap
                                                        className={
                                                            classes.loginButtonText
                                                        }
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
                <div style={{ height: '4px' }}>
                    {(userLoading ||
                        purchaseLoading ||
                        compLoading ||
                        searchLoading) && <LinearProgress />}
                    {/* <LinearProgress /> */}
                </div>
            </AppBar>

            {renderMenu}
            {renderSnackbar}
        </div>
    );
};

PrimarySearchAppBar.propTypes = {
    logout: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    clearPurchases: PropTypes.func.isRequired,
    clearComps: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    purchase: state.purchase,
    competition: state.competition,
    search: state.search,
});

export default connect(mapStateToProps, {
    logout,
    getUser,
    clearPurchases,
    clearComps,
    setUserLoading,
})(PrimarySearchAppBar);
