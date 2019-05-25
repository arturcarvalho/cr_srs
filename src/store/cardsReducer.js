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
}

function cards(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ANSWER:
      // don't add if it's wrong
      if (action.correct !== action.answer) return state

      // don't change if it's already in the list
      if (action.id in state.cardsById) return state

      return {
        ...state,
        cardsById: {
          ...state.cardsById,
          [action.id]: defaultCard,
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
