import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAcceptedComp } from '../../actions/competitionActions';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontWeight: "fontWeightBold"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  winningColour: {
      color: 'green'
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    paddingTop: '16px'
  },
  detailsAvatar: {
    alignItems: 'center',
    paddingTop: '32px'
  },
  column: {
    flexBasis: '25%',
  }
}));

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CurrentComps = ({ getAcceptedComp, user: { user }, competition: { accepted } }) => {
    useEffect(() => {
        // get state of currently logged in user
        getAcceptedComp();

        // eslint-disable-next-line
    }, []);

    const classes = useStyles();

    
    const getRight = (comp) => {
        if(user.userID === comp.user1){
            return {
                name: comp.user2name,
                total: comp.user2total
            }
        }else{
            return {
                name: comp.user1name,
                total: comp.user1total
            }
        }
    };

    const getLeft = (comp) => {
        if(user.userID !== comp.user1){
            return {
                name: comp.user2name,
                total: comp.user2total
            }
        }else{
            return {
                name: comp.user1name,
                total: comp.user1total
            }
        }
    };

    return (
        <div>
            <h1>Competitions:</h1>
            <Container maxWidth='lg'>
                <div className={classes.root}>
                    {accepted !== [] && 
                        accepted.map(comp => (
                            <ExpansionPanel key={comp._id}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1c-content"
                                    id="panel1c-header"
                                    >
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Typography id='competitor-header-name' variant='h5'>
                                            {getRight(comp).name}
                                        </Typography>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column} />
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Typography variant='h5' className={classes.secondaryHeading}>{monthNames[comp.month-1]} {comp.year}</Typography>
                                    </div>
                                </ExpansionPanelSummary>
                                <Divider />
                                <ExpansionPanelDetails className={classes.detailsAvatar}>
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Avatar>{getLeft(comp).name.substring(0,1)}</Avatar>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column} />
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Avatar>{getRight(comp).name.substring(0,1)}</Avatar>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Typography variant='h5'>
                                            {getLeft(comp).name}
                                        </Typography>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column} />
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Typography variant='h5'>
                                            {getRight(comp).name}
                                        </Typography>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Typography variant='h5'>
                                            ${getLeft(comp).total}
                                        </Typography>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column}>
                                        <h5>Total Spent</h5>
                                    </div>
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Typography variant='h5'>
                                            ${getRight(comp).total}
                                        </Typography>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Typography variant='h5'>
                                            {getLeft(comp).total - getRight(comp).total}
                                        </Typography>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column}>
                                        <h5>Difference</h5>
                                    </div>
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Typography variant='h5'>
                                            {getRight(comp).total - getLeft(comp).total}
                                        </Typography>
                                    </div>
                                </ExpansionPanelDetails>
                                <Divider />
                                <ExpansionPanelActions>
                                    <Button size="small" color="primary">
                                        View More
                                    </Button>
                                </ExpansionPanelActions>
                            </ExpansionPanel>

                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

CurrentComps.propTypes = {
    getAcceptedComp: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    competition: state.competition,
    user: state.user
});

export default connect(mapStateToProps, { getAcceptedComp })(CurrentComps);