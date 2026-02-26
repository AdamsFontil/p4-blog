import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification || !notification.message) {
    return null;
  }

  const cssClass =
    notification.messageType === "error" ? "error" : "info";

  return <div className={cssClass}>{notification.message}</div>;
};

export default Notification;
