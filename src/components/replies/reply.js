import React from "react"

import ChoicesReply from "../replies/choicesReply"
import InputReply from "../replies/inputReply"
import FlashReply from "../replies/flashReply"
import styles from "./reply.module.css"

const Reply = ({ id, isCorrect, correct, onAnswer, choices, cardType }) => {
  const choiceArgs = { id, isCorrect, correct, onAnswer, choices }
  const inputArgs = { id, isCorrect, correct, onAnswer }
  const flashArgs = {
    onAnswer: () => {
      onAnswer(id, true)
    },
  }

  if (isCorrect)
    return (
      <section className={styles.correct}>
        <header>The correct answer:</header>
        <blockquote>{correct}</blockquote>
      </section>
    )

  if (cardType === "choices") return <ChoicesReply {...choiceArgs} />
  if (cardType === "input") return <InputReply {...inputArgs} />
  if (cardType === "flash") return <FlashReply {...flashArgs} />
}

export default Reply
