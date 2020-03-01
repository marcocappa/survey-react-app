import {
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE
} from "../constants.js";

export function loadQuestionsFailure(error) {
  return {
    type: LOAD_QUESTIONS_FAILURE,
    error
  }
}

export function loadQuestionsSuccess(data) {
  return {
    type: LOAD_QUESTIONS_SUCCESS,
    data
  }
}

export function fetchQuestions() {
  return async (dispatch) => {

    let response = {
      body: undefined,
      error: undefined
    };

    try {
      response = await fetch('http://localhost:5000/questions')
        .then(questions => questions.json())
    } catch (err) {
      response.error = err;
    }

    const { body, error } = response;


    if (error) {
      dispatch(loadQuestionsFailure(response.error))
      return;
    }

    dispatch(loadQuestionsSuccess(body))
  }
}

