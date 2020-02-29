import {
  SELECT_ANSWER
} from "../constants.js";

export function selectAnswer(payload) {
  return {
    type: SELECT_ANSWER,
    payload
  }
}

