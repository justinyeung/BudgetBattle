import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAcceptedComp } from '../../actions/competitionActions';

const CurrentComps = ({ getAcceptedComp, competition: { accepted } }) => {

    useEffect(() => {
        // get state of currently logged in user
        getAcceptedComp();

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h1>Competitions:</h1>
            <ul>
                {accepted !== [] && 
                    accepted.map(comp => (
                        <div key={comp._id}>
                            <li>
                                <ul>
                                    <li>
                                        Competition ID: {comp._id}
                                    </li>
                                    <li>
                                        User1: {comp.user1}
                                    </li>
                                    <li>
                                        User2: {comp.user2}
                                    </li>
                                    <li>
                                        Status: {comp.status}
                                    </li>
                                </ul>
                            </li>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

CurrentComps.propTypes = {
    getAcceptedComp: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    competition: state.competition
});

export default connect(mapStateToProps, { getAcceptedComp })(CurrentComps);