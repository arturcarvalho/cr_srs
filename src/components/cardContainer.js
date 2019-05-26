import React from "react"
import { connect } from "react-redux"

import Card from "./card"
import { onAnswerInArticle } from "../store/cardsActions"

const cardColor = (id, cardsById) => {
  if (id in cardsById) return [true, "green"]
  return [null, "gray"]
}

const CardContainer = props => {
  const [isCorrect, statusColor] = cardColor(props.id, props.cardsById)
  const cardArgs = {
    ...props,
    isCorrect,
    statusColor,
  }

  return <Card {...cardArgs} />
}

const mapState = state => {
  return {
    cardsById: state.cards.cardsById,
  }
}

export default connect(
  mapState,
  { onAnswerInArticle }
)(CardContainer)
