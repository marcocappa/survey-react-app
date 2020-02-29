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
      err: undefined,
    };

    try {
      response.body = await fetch(`${process.env.PUBLIC_URL}/mockData.json`).then(questions => questions.json())
    }
    catch (err) {
      response.err = err
    }

    const { body, err } = response;

    if (err) {
      dispatch(loadQuestionsFailure(response.err))
    }

    dispatch(loadQuestionsSuccess(body.data))
  }
}

