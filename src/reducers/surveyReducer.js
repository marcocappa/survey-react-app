import {
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE,
  SELECT_ANSWER
} from "../constants";

import { normalize, schema } from 'normalizr';

const questionSchema = new schema.Entity('questions');
const surveyDataSchema = new schema.Array(questionSchema);

const initialState = {
  err: "",
  questions: {},
  answered: {},
  totalQuestions: 0,
  totalCorrect: 0
}

const questions = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ANSWER: {
      const { answerId, questionId } = action.payload;
      let isCorrect = false;
      let totalCorrect = state.totalCorrect;

      if (answerId === state.questions[questionId].correct) {
        isCorrect = true;
        totalCorrect = totalCorrect + 1;
      } else if (state.answered[questionId]) {
        totalCorrect = totalCorrect - 1;

      }

      return {
        ...state,
        answered: {
          ...state.answered,
          [action.payload.questionId]: { answer: action.payload.answerId, isCorrect },
        },
        totalCorrect
      }
    }

    case LOAD_QUESTIONS_FAILURE:
      return {
        ...state,
        questions: action.err
      }

    case LOAD_QUESTIONS_SUCCESS: {
      const { entities } = normalize(action.data, surveyDataSchema);
      return {
        ...state,
        questions: entities.questions,
        totalQuestions: action.data.length
      }
    }

    default:
      return state
  }
}

export default questions
