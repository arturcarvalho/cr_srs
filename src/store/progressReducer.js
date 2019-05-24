import actionTypes from "./actionTypes"

/**
 * SHAPE
 *   answersById: {
 *    "1-1": { correct: false },
 * },
 */

const initialState = {
  answersById: {},
}

function progress(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ANSWER:
      // don't add if it's wrong
      if (action.correct !== action.answer) return state

      // don't change if it's already in the list
      if (action.id in state.answersById) return state

      return {
        ...state,
        answersById: {
          ...state.answersById,
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
