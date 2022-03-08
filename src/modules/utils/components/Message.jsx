import React from "react";

const Message = ({ code, message }) => {
  const typeAlert = code === "OK" ? "primary" : code === "WARN" ? "warning" : code === "ERROR" ? "danger" : code;
  return (
    <div className={`alert alert-${typeAlert}`} role="alert">
      {message}
    </div>
  );
};

export default Message;
