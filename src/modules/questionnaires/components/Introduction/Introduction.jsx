import React from "react";

const Introduction = ({ text, setCurrentQuestionnaire }) => {
  const startQuestionnaire = () => {
    setCurrentQuestionnaire(oldQuestionnaire => ({...oldQuestionnaire, question_id: 0}));
  }

  return (
    <div>
      <div className="row">
        <div className="col text-center">
          <label style={{ fontFamily: "Lato", fontSize: "40px", marginBottom: "20px" }}>{text}</label>
          <div className="row">
            <div
              style={{
                textAlign: "center",
              }}
            >
              <button
                style={{ width: "200px", height: "70px", fontSize: "30px" }}
                className="btn btn-dark"
                onClick={startQuestionnaire}
              >
                EMPEZAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
