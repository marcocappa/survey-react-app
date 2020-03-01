import { normalize } from 'normalizr';
import { answerDataSchema } from "./schema";
import {
  ADD_ANSWER,
  CHECK_ANSWER_FAILURE,
  CHECK_ANSWER_SUCCESS
} from "../constants.js";

export function selectAnswer(payload) {
  return {
    type: ADD_ANSWER,
    payload
  }
}


export function checkAnswerFailure(error) {
  return {
    type: CHECK_ANSWER_FAILURE,
    error
  }
}

export function checkAnswerSuccess(data) {
  return {
    type: CHECK_ANSWER_SUCCESS,
    data
  }
}


function serverCheckAnswers(userAnswers, correctAnswers) {
  const { entities: normalizeCorrectAnswers } = normalize(correctAnswers, answerDataSchema);
  const { answer } = normalizeCorrectAnswers;

  return Object.keys(answer).reduce((acc, key) => (
    {
      ...acc,
      [answer[key].id]: answer[key].correct === userAnswers[key].answer ? "CORRECT" : "WRONG"
    }
  ), {})
}


export function submitAnswer(userAnswers) {
  return async (dispatch) => {

    let response = {
      body: undefined,
      error: undefined
    };

    try {
      response = await fetch('http://localhost:5000/answers')
        .then(answers => answers.json())
    } catch (err) {
      response.error = err;
    }

    const { body, error } = response;

    if (error) {
      dispatch(checkAnswerFailure(error));
      return;
    }

    const results = serverCheckAnswers(userAnswers, body)

    dispatch(checkAnswerSuccess(results));

  }
}