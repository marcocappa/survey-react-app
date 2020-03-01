import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Answer.css';

const Answer = ({
  answerId,
  questionId,
  answer,
  onClick,
  selected,
  correct
}) => (
  <button
    className={classnames(
      'answer',
      selected && 'answer-selected',
      selected && correct === 'CORRECT' && 'answer-correct',
      selected && correct === 'WRONG' && 'answer-wrong'
    )}
    onClick={() => onClick(answerId, questionId)}
  >
    {selected && (
      <span role="img" aria-label="Circle" className="circle">
        ⚪️
      </span>
    )}
    {answer}
  </button>
);

Answer.propTypes = {
  answerId: PropTypes.number.isRequired,
  questionId: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  correct: PropTypes.string
};

Answer.defaultProps = {
  selected: false,
  correct: ''
};

export default Answer;
