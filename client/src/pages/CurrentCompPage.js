import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { getCompetition, setCompLoading } from '../actions/competitionActions';

const CurrentCompetition = ({
    setCompLoading,
    getCompetition,
    competition: { competition, user1purchases, user2purchases },
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
                <p>{competition && competition.user2}</p>
                <p>{competition && competition.user2name}</p>
                <p>{competition && competition.user1}</p>
                <p>{competition && competition.user1name}</p>
            </div>
        </div>
    );
};

CurrentCompetition.propTypes = {
    setCompLoading: PropTypes.func.isRequired,
    getCompetition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    competition: state.competition,
});

export default connect(mapStateToProps, {
    setCompLoading,
    getCompetition,
})(CurrentCompetition);
