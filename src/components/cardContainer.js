import React from "react"
import { connect } from "react-redux"

import Card from "./card"
import { answer } from "../store/progressActions"

const cardColor = (id, answersById) => {
  if (id in answersById) return [true, "green"]
  return [null, "gray"]
}

const CardContainer = props => {
  const [isCorrect, statusColor] = cardColor(props.id, props.answersById)
  const cardArgs = {
    ...props,
    isCorrect,
    statusColor,
  }

  return <Card {...cardArgs} />
}

const mapState = state => {
  return {
    answersById: state.progress.answersById,
  }
}

export default connect(
  mapState,
  { answer }
)(CardContainer)
