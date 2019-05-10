import actionTypes from "./actionTypes"

const initialState = {
  counter: 123,
}

function progress(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { ...state, counter: state.counter + 1 }
    default:
      return state
  }
}

export default progress
