import actionTypes from "./actionTypes"
import { defaultCard } from "../utils/sm2"

/**
 * SHAPE
 *   cardsById: {
 *    "1-1": { correct: false },
 * },
 */

const initialState = {
  cardsById: {},
  points: 0,
}

function cards(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ANSWER_IN_ARTICLE:
      // don't add if it's wrong
      if (!action.isCorrect) return state

      // don't change if it's already in the list
      if (action.id in state.cardsById) return state

      return {
        points: state.points + 1,
        cardsById: {
          ...state.cardsById,
          [action.id]: defaultCard,
        },
      }

    case actionTypes.ANSWER_IN_REVIEW:
      const pointsToAdd = action.isCorrect ? 1 : 0

      return {
        points: state.points + pointsToAdd,
        cardsById: {
          ...state.cardsById,
          [action.id]: action.card,
        },
      }

    case actionTypes.RESET_PROGRESS:
      return initialState

    default:
      return state
  }
}

export default cards

// selectors

// get card
export const getCard = (state, id) => state.cardsById[id]

// count cards that user replied correctly inside an article
export const getCorrectCardsCount = state => Object.keys(state.cardsById).length

// get all cards that can be reviewed (date later than today)
export const getCardsToReview = state => {
  const now = new Date()
  const ids = Object.keys(state.cardsById).filter(id => {
    const nextPracticeDate = new Date(state.cardsById[id].nextPracticeDate)
    return now > nextPracticeDate
  })
  return ids
}
