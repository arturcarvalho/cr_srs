import React from "react"
import { connect } from "react-redux"

import Card from "./card"
import { answer } from "../store/progressActions"
import isCardCorrect from "../utils/isCardCorrect"

const CardContainer = props => {
  const isCorrect = isCardCorrect(props.id, props.answersById)
  const cardArgs = {
    ...props,
    isCorrect,
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
