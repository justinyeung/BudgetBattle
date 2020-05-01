import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAcceptedComp, getOutPendingComp, getInPendingComp } from '../../actions/competitionActions';

const CurrentComps = ({ getAcceptedComp, getOutPendingComp, getInPendingComp, competition: { accepted, outpending, inpending } }) => {

    useEffect(() => {
        // get state of currently logged in user
        getAcceptedComp();
        getOutPendingComp();
        getInPendingComp();

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
                    </div>))
                }
            </ul>
            <ul>
                <li>Out Pending:</li>
                {outpending !== [] && 
                    outpending.map(comp => (<div>
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
                    </div>))
                }
            </ul>
            <ul>
                <li>In Pending:</li>
                {inpending !== [] && 
                    inpending.map(comp => (<div>
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
                    </div>))
                }
            </ul>
        </div>
    )
}

CurrentComps.propTypes = {
    getAcceptedComp: PropTypes.func.isRequired,
    getOutPendingComp: PropTypes.func.isRequired,
    getInPendingComp: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    competition: state.competition
});

export default connect(mapStateToProps, { getAcceptedComp, getOutPendingComp, getInPendingComp })(CurrentComps);