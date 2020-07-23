import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import FriendForm from '../components/friends/FriendForm';
import FriendsList from '../components/friends/FriendsList';
import FriendRequests from '../components/friends/FriendRequests';

const FriendsPage = () => {
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
                        <FriendForm />
                    </Grid>
                    <Grid item md={6} xs={12} className="pages-sections">
                        <FriendRequests />
                    </Grid>
                    <Grid item md={6} xs={12} className="pages-sections">
                        <FriendsList />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default FriendsPage;
