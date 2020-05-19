import {
  SEND_COMP,
  ACCEPT_COMP,
  REJECT_DELETE_COMP,
  GET_ACCEPTED_COMP,
  GET_OUTPENDING_COMP,
  GET_INPENDING_COMP,
  COMP_ERROR,
  CLEAR_COMPS,
} from "./types";

import axios from "axios";

// Send competition request
export const sendCompRequest = ({ id, numMonth, numYear }) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // api call to send request
    let res = await axios.post(
      "/api/competitions/send",
      { id, numMonth, numYear },
      config
    );

    dispatch({
      type: SEND_COMP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: err,
    });
  }
};

// Get accepted competitions
export const getAcceptedComp = () => async (dispatch) => {
  try {
    let competitions = await axios.get("/api/competitions/accepted");

    dispatch({
      type: GET_ACCEPTED_COMP,
      payload: competitions.data,
    });
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: err,
    });
  }
};

// Get out pending competitions
export const getOutPendingComp = () => async (dispatch) => {
  try {
    let competitions = await axios.get("/api/competitions/outpending");
    dispatch({
      type: GET_OUTPENDING_COMP,
      payload: competitions.data,
    });
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: err,
    });
  }
};

// Get in pending competitions
export const getInPendingComp = () => async (dispatch) => {
  try {
    let competitions = await axios.get("/api/competitions/inpending");
    dispatch({
      type: GET_INPENDING_COMP,
      payload: competitions.data,
    });
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: err,
    });
  }
};

// Accept competition request
export const acceptComp = (compID) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let competition = await axios.put("/api/competitions", compID, config);

    dispatch({
      type: ACCEPT_COMP,
      payload: competition.data,
    });
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: err,
    });
  }
};

// Reject competition request
export const rejectOrDeleteComp = (comp) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        comp: comp,
      },
    };

    await axios.delete("/api/competitions", config);

    dispatch({
      type: REJECT_DELETE_COMP,
      payload: comp,
    });
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: err,
    });
  }
};

// Clear competitions from state
export const clearComps = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_COMPS,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: COMP_ERROR,
      payload: err,
    });
  }
};
