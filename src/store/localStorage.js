const SAVE_NAME = "coderanxLocalState"

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(SAVE_NAME, serializedState)
  } catch (error) {}
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(SAVE_NAME)
    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}
