import { combineReducers } from "redux"
import cards, * as fromCards from "./cardsReducer"

export default combineReducers({ cards })

export const getCorrectCardsCount = state =>
  fromCards.getCorrectCardsCount(state.cards)

export const getCardsToReview = state => fromCards.getCardsToReview(state.cards)
