import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FcInfo } from "react-icons/fc";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import InfoModal from "../../../../utils/components/Modals/InfoModal";
import Grade from "../misc/Grade";

const FillTextDropdown = ({ currentQuestionnaire }) => {
  useEffect(() => {
    setCurrentQuestion(currentQuestionnaire?.questions[currentQuestionnaire?.question_id]);
  }, [currentQuestionnaire]);

  const [currentQuestion, setCurrentQuestion] = useState();
  const [showClue, setShowClue] = useState(false);
  return (
    <div>
      <InfoModal
        show={showClue}
        setShow={setShowClue}
        title={"Ayuda"}
        body={currentQuestion?.clue}
        accepText={"Aceptar"}
      />
      <div className="row">
        <div>
          <div className="container">
            <label className="form-label" style={{ fontSize: "30px" }}>
              {currentQuestion?.title}{" "}
              {currentQuestion?.have_clue === true ? <FcInfo style={{cursor: "pointer"}} size="1em" onClick={() => setShowClue(true)} /> : null}
            </label>
            <Grade grade={currentQuestion?.grade} />
            <div className="input-group input-group-sm mb-3" style={{ fontSize: "17px" }}>
              {currentQuestion?.tokens.map((token, i) => {
                return token.type === "input" ? (
                  <div
                    key={i}
                    className="fill-dropdown-revision"
                    value={token.option_id_selected}
                    style={{
                      color: "white",
                      marginLeft: "10px",
                      marginRight: "10px",
                      height: "30px",
                      cursor: "not-allowed",
                      display: "flex",
                      minWidth: "140px",
                    }}
                  >
                    {token.errored && !!token.wrong  ? (
                      <>
                        <span className="wrong-grade" style={{ textDecoration: "line-through" }}>
                          {token.wrong}
                        </span>
                        <MdCancel style={{ marginLeft: "5px" }} size="1em" color="red"></MdCancel>
                      </>
                    ) : (
                      <></>
                    )}
                    <span style={{ marginLeft: "15px" }} className="good-grade">
                      {token.good}
                    </span>
                    <MdCheckCircle
                      style={{ marginLeft: "5px", marginRight: "5px" }}
                      size="1em"
                      color="green"
                    ></MdCheckCircle>
                    <BsChevronDown size="13px" color="black" style={{ marginRight: "7px" }} />
                  </div>
                ) : (
                  <p style={{ display: "inline-block" }}>{token.text}</p>
                );
              })}
            </div>
          </div>
        </div>
        {currentQuestion?.image === true ? (
          <div style={{ textAlign: "center" }} className="row">
            <div className="col-5 justify-content-center container">
              <img src={currentQuestion?.image_url} className="img-fluid rounded" alt="help_image" />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FillTextDropdown;
