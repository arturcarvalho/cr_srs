import actionTypes from "./actionTypes"

/**
 * SHAPE
 *   answersById: {
 *    VDs4rKJnb: { correct: false },
 * },
 */

const initialState = {
  answersById: {},
}

function progress(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ANSWER:
      return {
        ...state,
        answersById: {
          ...state.answersById,
          [action.id]: { correct: action.correct === action.answer },
        },
      }
    default:
      return state
  }
}

export default progress
