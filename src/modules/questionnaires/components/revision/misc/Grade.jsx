import React from "react";

const Grade = ({ grade }) => {

  return (
    <label style={{marginLeft: "20px", fontWeight: "600"}}>{"Puntuación "}
    <span style={{marginLeft: "3px"}} className={grade == 0 ? 'wrong-grade' : grade == 100 ? 'good-grade' : 'warn-grade'}>{`${grade}/100`}</span>
    </label>
  );
};

export default Grade;
