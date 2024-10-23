import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let previousTimeout = null;
export const showNotification = (message, timeout = 5) => {
  return async (dispatch) => {
    // Clear the previous timeout so that new notifications don't get cleared too soon.
    if (previousTimeout) {
      clearTimeout(previousTimeout);
    }
    dispatch(setNotification(message));
    previousTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
