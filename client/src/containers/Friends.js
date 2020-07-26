import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    acceptFriend,
    deleteFriend,
    sendFriendRequest,
    setUserLoading,
} from '../actions/userActions';

import { searchUsers, setSearchLoading } from '../actions/searchActions';

import FriendForm from '../components/friends/FriendForm';
import FriendsList from '../components/friends/FriendsList';
import FriendRequests from '../components/friends/FriendRequests';

import { Grid, Container } from '@material-ui/core';

const Friends = ({
    searchUsers,
    sendFriendRequest,
    acceptFriend,
    deleteFriend,
    setUserLoading,
    setSearchLoading,
    user,
    search,
}) => {
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
                        <FriendForm
                            sendFriendRequest={sendFriendRequest}
                            searchUsers={searchUsers}
                            acceptFriend={acceptFriend}
                            deleteFriend={deleteFriend}
                            setUserLoading={setUserLoading}
                            setSearchLoading={setSearchLoading}
                            user={user}
                            search={search}
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
                        <FriendsList
                            deleteFriend={deleteFriend}
                            setUserLoading={setUserLoading}
                            user={user}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

Friends.propTypes = {
    user: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    searchUsers: PropTypes.func.isRequired,
    deleteFriend: PropTypes.func.isRequired,
    acceptFriend: PropTypes.func.isRequired,
    setUserLoading: PropTypes.func.isRequired,
    setSearchLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    search: state.search,
});

export default connect(mapStateToProps, {
    sendFriendRequest,
    searchUsers,
    deleteFriend,
    acceptFriend,
    setUserLoading,
    setSearchLoading,
})(Friends);
