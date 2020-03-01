import { normalize } from 'normalizr';
import { surveyDataSchema } from "./schema";
import {
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE,
  ADD_ANSWER,
  CHECK_ANSWER_FAILURE,
  CHECK_ANSWER_SUCCESS
} from "../constants";

const initialState = {
  error: "",
  questions: {},
  answered: {},
  totalQuestions: 0,
  results: {},
  totalCorrect: undefined
}

const questions = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS_FAILURE:
      return {
        ...state,
        error: action.error
      }

    case LOAD_QUESTIONS_SUCCESS: {
      const { entities } = normalize(action.data, surveyDataSchema);
      return {
        ...state,
        questions: entities.questions,
        totalQuestions: action.data.length
      }
    }

    case ADD_ANSWER: {
      const { answerId, questionId } = action.payload;

      return {
        ...state,
        answered: {
          ...state.answered,
          [questionId]: { question: questionId, answer: answerId }
        },
        results: {
          ...state.results,
          [questionId]: ""
        },
        totalCorrect: undefined
      }
    }

    case CHECK_ANSWER_FAILURE:
      return {
        ...state,
        error: action.error
      }

    case CHECK_ANSWER_SUCCESS: {
      return {
        ...state,
        results: action.data,
        totalCorrect: Object.keys(action.data).reduce(
          (acc, key) => action.data[key] === "CORRECT" ? acc + 1 : acc,
          0
        )
      }
    }

    default:
      return state
  }
}

export default questions
