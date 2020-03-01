import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import Question from '../../components/Question';
import Answer from '../../components/Answer';

import {
  fetchQuestions as fetchQuestionsAction,
  resetSurvey as resetSurveyAction
} from '../../actions/questionActions';
import {
  selectAnswer as selectAnswerAction,
  submitAnswer as submitAnswerAction
} from '../../actions/answerActions';

import { RESOURCE_NOT_FOUND } from '../../constants';

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
  }
  componentDidMount() {
    this.props.fetchQuestions();
  }

  componentWillUnmount() {
    this.props.resetSurvey();
  }

  checkAllQuestionsAnswered = () => {
    const { answered, totalQuestions } = this.props;
    return !(Object.keys(answered).length === totalQuestions);
  };

  handleSelectAnwser = async (answerId, questionId) => {
    const { selectAnswer } = this.props;
    await selectAnswer({ questionId, answerId });

    this.setState({
      disabled: this.checkAllQuestionsAnswered()
    });
  };

  handleSubmit = () => {
    const { answered, submitAnswer } = this.props;
    submitAnswer(answered);
  };

  render() {
    const {
      questions,
      totalQuestions,
      answered,
      error,
      totalCorrect,
      results
    } = this.props;
    const { disabled } = this.state;
    return (
      <div className="app">
        <header className="header">
          <Link to="/" title="Go back and exit survey">
            Go back
          </Link>
        </header>

        <main className="container">
          {error ? (
            error === RESOURCE_NOT_FOUND ? (
              <h2 className="survey-title">Error 404! </h2>
            ) : (
              <h2 className="survey-title">
                Server Error! Please be sure to have the server up and running!
              </h2>
            )
          ) : (
            <>
              <h2 className="survey-title">
                This Survey consists in {totalQuestions} questions. Please try
                your best!
              </h2>
              <div className="survey-container">
                {Object.keys(questions).map(key => {
                  return (
                    <React.Fragment key={key}>
                      <Question
                        question={questions[key].question}
                        index={key}
                      />
                      {questions[key].answers?.map((answer, index) => (
                        <Answer
                          key={answer}
                          answerId={index}
                          questionId={key}
                          onClick={this.handleSelectAnwser}
                          answer={answer}
                          selected={answered[key]?.answer === index}
                          correct={results[key]}
                        />
                      ))}
                    </React.Fragment>
                  );
                })}

                <div className="action">
                  {totalCorrect >= 0 && (
                    <h2>
                      {totalCorrect === totalQuestions && 'Awesome!'} Your
                      result is {totalCorrect} correct{' '}
                      {totalCorrect === 1 ? 'answer' : 'answers'}!
                    </h2>
                  )}
                  <button
                    className={classnames(
                      'btn',
                      (disabled || totalCorrect >= 0) && 'btn--disabled'
                    )}
                    onClick={this.handleSubmit}
                    disabled={disabled}
                    title="Submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    );
  }
}

Survey.propTypes = {
  questions: PropTypes.shape({
    id: PropTypes.shape({
      id: PropTypes.number,
      question: PropTypes.string,
      answer: PropTypes.arrayOf(PropTypes.string)
    })
  }),
  answered: PropTypes.shape({
    id: PropTypes.shape({
      question: PropTypes.number,
      answers: PropTypes.number
    })
  }),
  results: PropTypes.shape({
    id: PropTypes.string
  }),
  error: PropTypes.string,
  totalQuestions: PropTypes.number,
  totalCorrect: PropTypes.number,
  fetchQuestions: PropTypes.func.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  resetSurvey: PropTypes.func.isRequired
};

Survey.defaultProps = {
  questions: {},
  answered: {},
  totalQuestions: undefined,
  results: {},
  totalCorrect: undefined
};

const mapDispatchToProps = {
  fetchQuestions: fetchQuestionsAction,
  selectAnswer: selectAnswerAction,
  submitAnswer: submitAnswerAction,
  resetSurvey: resetSurveyAction
};

const mapStateToProps = state => {
  return {
    questions: state.survey.questions,
    totalQuestions: state.survey.totalQuestions,
    answered: state.survey.answered,
    error: state.survey.error,
    results: state.survey.results,
    totalCorrect: state.survey.totalCorrect
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
