import actionTypes from "./actionTypes"

export const onAnswerInArticle = (id, isCorrect) => {
  return {
    type: actionTypes.ANSWER_IN_ARTICLE,
    id,
    isCorrect,
  }
}

export const resetProgress = () => {
  return { type: actionTypes.RESET_PROGRESS }
}
