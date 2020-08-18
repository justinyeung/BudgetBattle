import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addPurchase, setPurchaseLoading } from '../actions/purchaseActions';
import {
    acceptFriend,
    deleteFriend,
    setUserLoading,
} from '../actions/userActions';
import {
    acceptComp,
    rejectOrDeleteComp,
    setCompLoading,
} from '../actions/competitionActions';

import PurchaseForm from '../components/purchases/PurchaseForm';
import CompRequests from '../components/competitions/CompRequests';
import FriendRequests from '../components/friends/FriendRequests';

import { Grid, Container } from '@material-ui/core';

const Dashboard = ({
    addPurchase,
    setPurchaseLoading,
    acceptFriend,
    deleteFriend,
    setUserLoading,
    acceptComp,
    rejectOrDeleteComp,
    setCompLoading,
    user,
    competition,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Container maxWidth="lg" className="pages">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item xs={12} className="pages-sections">
                        <PurchaseForm
                            addPurchase={addPurchase}
                            setPurchaseLoading={setPurchaseLoading}
                        />
                    </Grid>
                    <Grid item md={6} xs={12} className="pages-sections">
                        <FriendRequests
                            acceptFriend={acceptFriend}
                            deleteFriend={deleteFriend}
                            setUserLoading={setUserLoading}
                            user={user}
                        />
                    </Grid>
                    <Grid item md={6} xs={12} className="pages-sections">
                        <CompRequests
                            acceptComp={acceptComp}
                            rejectOrDeleteComp={rejectOrDeleteComp}
                            setCompLoading={setCompLoading}
                            competition={competition}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

Dashboard.propTypes = {
    addPurchase: PropTypes.func.isRequired,
    setPurchaseLoading: PropTypes.func.isRequired,
    acceptFriend: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
    acceptComp: PropTypes.func.isRequired,
    rejectOrDeleteComp: PropTypes.func.isRequired,
    setCompLoading: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    competition: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps, {
    addPurchase,
    setPurchaseLoading,
    acceptFriend,
    deleteFriend,
    setUserLoading,
    acceptComp,
    rejectOrDeleteComp,
    setCompLoading,
})(Dashboard);
