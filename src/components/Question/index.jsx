import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ question, index }) => (
  <h3>
    {index} - {question}
  </h3>
);

Question.propTypes = {
  question: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired
};

export default Question;
