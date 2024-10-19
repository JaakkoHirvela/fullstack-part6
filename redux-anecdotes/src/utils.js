import { setNotification, clearNotification } from "./reducers/notificationReducer";

let previousTimeout = null;

export const showNotification = (dispatch, message, timeout = 5000) => {
  // Clear the previous timeout so that new notifications don't get cleared too early
  if (previousTimeout) {
    clearTimeout(previousTimeout);
  }

  dispatch(setNotification(message));
  previousTimeout = setTimeout(() => {
    dispatch(clearNotification());
  }, timeout);
};
