import {
  LOGIN,
  GET_USER,
  LOGOUT,
  DELETE_USER,
  AUTH_ERROR,
  USER_ERROR,
  SEND_FRIEND,
  ACCEPT_FRIEND,
  DELETE_FRIEND,
  FRIEND_ERROR,
  SET_LOADING,
} from "./types";

import axios from "axios";

// Login user
export const login = () => async (dispatch) => {
  try {
    // api call to get current user
    // const res = await axios.get('/api/users/current');

    dispatch({
      type: LOGIN,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};

// set loading
export const setLoading = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};

// Get current logged in user and user's friends
export const getUser = () => async (dispatch) => {
  try {
    console.log("after loading");

    // api call to get current user
    const res = await axios.get("/api/users/current");

    console.log("after api");

    if (res.data !== null) {
      localStorage.setItem("isLoggedIn", true);
    } else {
      localStorage.removeItem("isLoggedIn");
    }

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log("Login failed");
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};

// logout user
export const logout = () => async (dispatch) => {
  try {
    // api call to log out user
    await axios.get("/api/users/logout");

    localStorage.removeItem("isLoggedIn");

    dispatch({
      type: LOGOUT,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};

// delete user
export const deleteUser = () => async (dispatch) => {
  try {
    // api call to delete user
    await axios.delete("/api/users/delete");

    dispatch({
      type: DELETE_USER,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};

// Add friend to current user
export const sendFriendRequest = (friendID) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // api call to add friend, friendID as param
    // returns updated current user object
    let updatedCurrent = await axios.post(
      "/api/friends/send",
      friendID,
      config
    );

    dispatch({
      type: SEND_FRIEND,
      payload: updatedCurrent.data,
    });
  } catch (err) {
    dispatch({
      type: FRIEND_ERROR,
      payload: err,
    });
    console.log(err);
  }
};

// Accept friend request
export const acceptFriend = (friendID) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // returns updated friend object
    let friend = await axios.put("/api/friends", friendID, config);

    dispatch({
      type: ACCEPT_FRIEND,
      payload: friend.data,
    });
  } catch (err) {
    dispatch({
      type: FRIEND_ERROR,
      payload: err,
    });
  }
};

// Delete friend for current user
export const deleteFriend = (friendID) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        friendID: friendID,
      },
    };

    console.log(friendID);

    // api call to add friend, friendID as param
    await axios.delete("/api/friends", config);

    dispatch({
      type: DELETE_FRIEND,
      payload: friendID.friendID,
    });
  } catch (err) {
    dispatch({
      type: FRIEND_ERROR,
      payload: err,
    });
    console.log(err);
  }
};
