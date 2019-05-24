import actionTypes from "./actionTypes"

/**
 * SHAPE
 *   cardsById: {
 *    "1-1": { correct: false },
 * },
 */

const initialState = {
  cardsById: {},
}

function progress(state = initialState, action) {
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
          [action.id]: null,
        },
      }

    case actionTypes.RESET_PROGRESS:
      return initialState

    default:
      return state
  }
}

export default progress
