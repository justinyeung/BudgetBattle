import React, { useEffect, useState } from 'react';
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
    getCompetitor,
    getCompetitorPurchases,
    user: { user },
    competition: { competition, competitorPurchases },
}) => {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setCompLoading();
        getCompetition({ id });
        setLoad(true);

        // eslint-disable-next-line
    }, []);

    const loadCompetitor = (id) => {
        // let month = competition.month;
        // let year = competition.year;
        // getCompetitorPurchases({ id, month, year });
        // setLoad(false);
    };

    let { id } = useParams();

    return (
        <div>
            <div style={{ padding: '1rem' }}>
                <p>{competition && competition._id}</p>

                {user && competition && user.userID === competition.user1 ? (
                    <div>
                        {user &&
                            competition &&
                            load &&
                            loadCompetitor(competition.user2)}
                        <p>{competition && competition.user2}</p>
                        <p>{competition && competition.user2name}</p>
                    </div>
                ) : (
                    <div>
                        {user &&
                            competition &&
                            load &&
                            loadCompetitor(competition.user1)}
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
