import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAccepted, getPending } from '../../actions/competitionActions';

const CurrentComps = ({ getAccepted, getPending, competition: { accepted, pending } }) => {

    useEffect(() => {
        // get state of currently logged in user
        getAccepted();
        getPending();

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <ul>
                <li>Accepted:</li>
                {accepted !== [] && 
                    accepted.map(comp => (<div>
                        <li>
                            <ul>
                                <li>
                                    {comp._id}
                                </li>
                                <li>
                                    {comp.user1}
                                </li>
                                <li>
                                    {comp.user2}
                                </li>
                                <li>
                                    {comp.status}
                                </li>
                            </ul>
                        </li>
                    </div>))
                }
            </ul>
            <ul>
                <li>Pending:</li>
                {pending !== [] && 
                    pending.map(comp => (<div>
                        <li>
                            <ul>
                                <li>
                                    {comp._id}
                                </li>
                                <li>
                                    {comp.user1}
                                </li>
                                <li>
                                    {comp.user2}
                                </li>
                                <li>
                                    {comp.status}
                                </li>
                            </ul>
                        </li>
                    </div>))
                }
            </ul>
        </div>
    )
}

CurrentComps.propTypes = {
    getAccepted: PropTypes.func.isRequired,
    getPending: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    competition: state.competition
});

export default connect(mapStateToProps, { getAccepted, getPending })(CurrentComps);