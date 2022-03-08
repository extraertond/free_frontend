import React from "react";

const Spinner = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div
        className="spinner-border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
