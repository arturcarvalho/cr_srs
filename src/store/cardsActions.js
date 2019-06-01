import actionTypes from "./actionTypes"
import sm2 from "../utils/sm2"

export const onAnswerInArticle = (id, isCorrect) => {
  return {
    type: actionTypes.ANSWER_IN_ARTICLE,
    id,
    isCorrect,
  }
}

export const onAnswerInReview = (id, grade, currentCardState) => {
  const card = sm2(grade, currentCardState)

  // console.log("-- before --")
  // console.log(JSON.stringify(currentCardState, null, 2))
  // console.log("-- after --")
  // console.log(JSON.stringify(card, null, 2))
  return {
    type: actionTypes.ANSWER_IN_REVIEW,
    id,
    card,
    isCorrect: grade >= 3
  }
}

export const resetProgress = () => {
  return { type: actionTypes.RESET_PROGRESS }
}
