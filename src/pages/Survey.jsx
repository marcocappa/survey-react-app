import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

import Question from "../components/Question";
import Answer from "../components/Answer";

import { fetchQuestions as fetchQuestionsAction } from "../actions/questionActions"
import { selectAnswer as selectAnswerAction } from "../actions/answerActions"

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    }
  }
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  checkAllQuestionsAnswered = () => {
    const { answered, totalQuestions } = this.props;
    return !(Object.keys(answered).length === totalQuestions);
  }

  handleSelectAnwser = (answerId, questionId) => {
    const { selectAnswer } = this.props;
    selectAnswer({ questionId, answerId })

    this.setState({
      disabled: this.checkAllQuestionsAnswered()
    })
  }

  handleSubmit = () => {

  }

  render() {
    const { questions, totalQuestions, answered } = this.props;
    const { disabled } = this.state;
    return (
      <div className="app">
        <header className="header">
          <Link to="/" title="Go back and exit survey">Go back</Link>
        </header>

        <main className="container">
          <h2 className="survey-title">This Survey consists in {totalQuestions} questions. Please try your best!</h2>
          <div className="survey-container">
            {Object.keys(questions).map((key) => {
              return (<React.Fragment key={key}>
                <Question question={questions[key].question} index={key} />
                {questions[key].answers?.map((answer, index) => <Answer
                  key={answer}
                  answerId={index}
                  questionId={key}
                  onClick={this.handleSelectAnwser}
                  answer={answer}
                  selected={answered[key]?.answer === index}
                />)}
              </React.Fragment>)
            })}

            <div className="action">
              <button
                className={classnames("btn", disabled && "btn--disabled")}
                onClick={this.handleSubmit}
                disabled={disabled}
                title="Submit"
              >Submit</button>
            </div>
          </div>
        </main>
      </div>
    )
  }
};

const mapDispatchToProps = {
  fetchQuestions: fetchQuestionsAction,
  selectAnswer: selectAnswerAction
}

const mapStateToProps = (state) => {
  return {
    questions: state.survey.questions,
    totalQuestions: state.survey.totalQuestions,
    answered: state.survey.answered
  }
}

Survey.defaultProps = {
  questions: {},
  answered: {},
  totalQuestions: undefined
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);