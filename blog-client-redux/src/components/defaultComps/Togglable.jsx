import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="p-4">
      <div style={hideWhenVisible}>
        <button className="btn btn-primary" onClick={toggleVisibility}>
          {props.buttonLabelShow}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="btn btn-secondary" onClick={toggleVisibility}>
          {props.buttonLabelCancel}
        </button>
      </div>
    </div>
  );
};

export default Togglable;
