import { normalize } from 'normalizr';
import { surveyDataSchema } from './schema';
import {
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE,
  ADD_ANSWER,
  CHECK_ANSWER_FAILURE,
  CHECK_ANSWER_SUCCESS,
  RESET_SURVEY
} from '../constants';

const initialState = {
  error: '',
  questions: {},
  answered: {},
  totalQuestions: 0,
  results: {},
  totalCorrect: undefined
};

const questions = (state = initialState, action) => {
  switch (action.type) {
    case RESET_SURVEY:
      return initialState;

    case LOAD_QUESTIONS_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case LOAD_QUESTIONS_SUCCESS: {
      const { entities } = normalize(action.payload, surveyDataSchema);
      return {
        ...state,
        questions: entities.questions,
        totalQuestions: action.payload.length
      };
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
          [questionId]: ''
        },
        totalCorrect: undefined
      };
    }

    case CHECK_ANSWER_FAILURE:
      return {
        ...state,
        error: action.payload
      };

    case CHECK_ANSWER_SUCCESS: {
      return {
        ...state,
        results: action.payload,
        totalCorrect: Object.keys(action.payload).reduce(
          (acc, key) => (action.payload[key] === 'CORRECT' ? acc + 1 : acc),
          0
        )
      };
    }

    default:
      return state;
  }
};

export default questions;
