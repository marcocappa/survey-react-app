import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchQuestions as fetchQuestionsAction } from "../actions/index.js"

class Survey extends React.Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    console.log(fetchQuestions);
    fetchQuestions();
  }
  render() {
    const { questions } = this.props;
    console.log(this.props)
    return (
      <div className="app">
        <header className="header">
          <Link to="/" title="Go back and exit survey">Go back</Link>
        </header>

        <main className="container">
          <h1>Survey React App</h1>
          {questions?.map(q => <p key={q.question}>{q.question}</p>)}
        </main>
      </div>
    )
  }
};

const mapDispatchToProps = {
  fetchQuestions: fetchQuestionsAction
}

const mapStateToProps = (state) => {
  return { questions: state.survey.questions }
}

Survey.defaultProps = {
  questions: []
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);