import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import {
    getCompetition,
    getCompetitor,
    getCompetitorPurchases,
    setCompLoading,
} from '../actions/competitionActions';

const CurrentCompetition = ({
    setCompLoading,
    getCompetition,
    user: { user },
    competition: { competition },
}) => {
    useEffect(() => {
        setCompLoading();
        getCompetition({ id });

        // eslint-disable-next-line
    }, []);

    let { id } = useParams();

    return (
        <div>
            <div style={{ padding: '1rem' }}>
                <p>{competition && competition._id}</p>

                {user && competition && user.userID === competition.user1 ? (
                    <div>
                        <p>{competition && competition.user2}</p>
                        <p>{competition && competition.user2name}</p>
                    </div>
                ) : (
                    <div>
                        <p>{competition && competition.user1}</p>
                        <p>{competition && competition.user1name}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

CurrentCompetition.propTypes = {
    setCompLoading: PropTypes.func.isRequired,
    getCompetition: PropTypes.func.isRequired,
    getCompetitor: PropTypes.func.isRequired,
    getCompetitorPurchases: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps, {
    setCompLoading,
    getCompetition,
    getCompetitor,
    getCompetitorPurchases,
})(CurrentCompetition);
