import {
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE,
  RESET_SURVEY
} from "../constants.js";

export function loadQuestionsFailure(payload) {
  return {
    type: LOAD_QUESTIONS_FAILURE,
    payload
  }
}

export function loadQuestionsSuccess(payload) {
  return {
    type: LOAD_QUESTIONS_SUCCESS,
    payload
  }
}

export function resetSurvey() {
  return {
    type: RESET_SURVEY
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


