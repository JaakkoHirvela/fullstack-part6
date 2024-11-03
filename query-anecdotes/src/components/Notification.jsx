import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import { useNotificationValue } from "../utils";

// eslint-disable-next-line react/prop-types
const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const notification = useNotificationValue();
  console.log("NOTIFICATION: " + notification);

  if (notification === null) {
    return null;
  }
  return <div style={style}>{notification}</div>;
};

export default Notification;
