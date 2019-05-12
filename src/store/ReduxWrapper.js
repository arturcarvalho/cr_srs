import React from "react"
import { Provider } from "react-redux"
import { createStore as reduxCreateStore } from "redux"
import throttle from "lodash.throttle"

import rootReducer from "./rootReducer"
import { loadState, saveState } from "./localStorage"

const persistedState = loadState()
const store = reduxCreateStore(rootReducer, persistedState)

// update localstore at most once per second
store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 1000)
)

export default ({ element }) => <Provider store={store}>{element}</Provider>
