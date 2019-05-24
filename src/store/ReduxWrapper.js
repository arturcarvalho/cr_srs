import React from "react"
import { Provider } from "react-redux"
import { createStore as reduxCreateStore } from "redux"
import throttle from "lodash.throttle"

import rootReducer from "./rootReducer"
import { loadState, saveState } from "./localStorage"

const persistedState = loadState()

// https://github.com/gatsbyjs/gatsby/issues/6137
// check if window exists, if not
// pass the identity function (enhancer needs to be a function)

const windowGlobal = typeof window !== "undefined" && window

const devTools =
  process.env.NODE_ENV === "development" && windowGlobal.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f

/* eslint-disable no-underscore-dangle */
const store = reduxCreateStore(rootReducer, persistedState, devTools)
/* eslint-enable */

// update localstore at most once per second
store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 1000)
)

export default ({ element }) => <Provider store={store}>{element}</Provider>
