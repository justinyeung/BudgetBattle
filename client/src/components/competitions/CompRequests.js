import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getOutPendingComp,
  getInPendingComp,
} from "../../actions/competitionActions";

const CompRequests = ({
  getOutPendingComp,
  getInPendingComp,
  competition: { outpending, inpending },
}) => {
  useEffect(() => {
    // get state of currently logged in user
    getOutPendingComp();
    getInPendingComp();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Competition Requests</h1>
      <ul>
        <li>Out Pending:</li>
        {outpending !== [] &&
          outpending.map((comp) => (
            <div key={comp._id}>
              <li>
                <ul>
                  <li>Competition ID: {comp._id}</li>
                  <li>User1: {comp.user1}</li>
                  <li>User2: {comp.user2}</li>
                  <li>Status: {comp.status}</li>
                </ul>
              </li>
            </div>
          ))}
      </ul>
      <ul>
        <li>In Pending:</li>
        {inpending !== [] &&
          inpending.map((comp) => (
            <div key={comp._id}>
              <li>
                <ul>
                  <li>Competition ID: {comp._id}</li>
                  <li>User1: {comp.user1}</li>
                  <li>User2: {comp.user2}</li>
                  <li>Status: {comp.status}</li>
                </ul>
              </li>
            </div>
          ))}
      </ul>
    </div>
  );
};

CompRequests.propTypes = {
  getOutPendingComp: PropTypes.func.isRequired,
  getInPendingComp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  competition: state.competition,
});

export default connect(mapStateToProps, {
  getOutPendingComp,
  getInPendingComp,
})(CompRequests);
