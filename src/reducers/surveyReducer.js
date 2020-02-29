import {
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE
} from "../constants";

const initialState = {
  questions: [],
  err: ""
}

const questions = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS_FAILURE:
      return {
        ...state,
        questions: action.err
      }

    case LOAD_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.data
      }

    default:
      return state
  }
}

export default questions
