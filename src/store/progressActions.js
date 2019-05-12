import actionTypes from "./actionTypes"

export const answer = (id, answer, correct) => {
  return {
    type: actionTypes.ANSWER,
    id,
    answer,
    correct,
  }
}
