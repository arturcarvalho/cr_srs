import React from "react"
import { connect } from "react-redux"

import Card from "./card"
import { answer } from "../store/progressActions"

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
    cardsById: state.progress.cardsById,
  }
}

export default connect(
  mapState,
  { answer }
)(CardContainer)
