import actionTypes from "./actionTypes"

export const answer = (id, answer, correct) => {
  return {
    type: actionTypes.ANSWER,
    id,
    answer,
    correct,
  }
}

export const resetProgress = () => {
  return { type: actionTypes.RESET_PROGRESS }
}
