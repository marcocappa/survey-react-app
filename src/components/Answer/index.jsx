import React from "react";
import classnames from "classnames";

import "./Answer.css";

const Answer = ({ answerId, questionId, answer, onClick, selected, correct }) => (
  <button
    className={classnames("answer",
      selected && "answer-selected",
      selected && correct === "CORRECT" && "answer-correct",
      selected && correct === "WRONG" && "answer-wrong"
    )}
    onClick={() => onClick(answerId, questionId)}>
    {selected && <span role="img" aria-label="Circle" className="circle">⚪️</span>}
    {answer}
  </button>
)

export default Answer;