import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAcceptedComp } from '../../actions/competitionActions';

// import { getUserById } from '../../actions/userActions';

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

const CurrentComps = ({ getAcceptedComp, competition: { accepted } }) => {

    useEffect(() => {
        // get state of currently logged in user
        getAcceptedComp();
        // getUserById('100604803256524080496').then(data => {
        //     console.log(data.name);
        // })
        // eslint-disable-next-line
    }, []);

    const classes = useStyles();

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
                                        <Typography id='competitor-header-name' variant='h5'>Alyssa Schleifer</Typography>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column} />
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Typography className={classes.secondaryHeading}>CompetitionID: {comp._id}</Typography>
                                    </div>
                                </ExpansionPanelSummary>
                                <Divider />
                                <ExpansionPanelDetails className={classes.detailsAvatar}>
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Avatar>JY</Avatar>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column} />
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Avatar>AS</Avatar>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Typography variant='h5'>
                                            Person 1
                                        </Typography>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column} />
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Typography variant='h5'>
                                            Person 2
                                        </Typography>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Typography variant='h5'>$145</Typography>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column}>
                                        <h5>Total Spent</h5>
                                    </div>
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Typography variant='h5'>$160</Typography>
                                    </div>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails className={classes.details}>
                                    <div id="competitions-left-column" className={classes.column}>
                                        <Typography className={classes.winningColour} variant='h5'>-15</Typography>
                                    </div>
                                    <div id="competitions-center-column" className={classes.column}>
                                        <h5>Difference</h5>
                                    </div>
                                    <div id="competitions-right-column" className={classes.column}>
                                        <Typography color='error' variant='h5'>+15</Typography>
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
    competition: state.competition
});

export default connect(mapStateToProps, { getAcceptedComp })(CurrentComps);