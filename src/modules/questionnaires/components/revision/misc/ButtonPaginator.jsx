import "../../../../../index.css";

const ButtonPaginator = ({ id, currentQuestionnaire, setCurrentQuestionnaire }) => {
  const gotoQuestion = () => {
    setCurrentQuestionnaire((oldQuestionnaire) => ({ ...oldQuestionnaire, question_id: id }));
  };
  const getStyles = () => {
    let styles = "";
    if (currentQuestionnaire?.question_id === id) {
      styles = "btn btn-info btn-sm";
    } else {
      styles += "btn btn-outline-info btn-sm";
      if (currentQuestionnaire?.questions[id]?.answered) {
        styles += " paginator-button-answered";
      }
    }

    return styles;
  };

  return (
    <button
      type="button"
      className={getStyles()}
      onClick={gotoQuestion}
      style={{ marginRight: "5px", marginTop: "2px" }}
    >
      {id + 1}
    </button>
  );
};

export default ButtonPaginator;
