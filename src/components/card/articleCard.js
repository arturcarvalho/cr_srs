import React from "react"

import styles from "./card.module.css"
import StatusBall from "../statusBall"
import ChoicesReply from "./choicesReply"
import InputReply from "./inputReply"

function Card({
  id,
  answer,
  isCorrect,
  statusColor,
  correct,
  title,
  html,
  choices,
}) {
  const choiceArgs = {
    choices,
    isCorrect,
    correct,
    answer,
    id,
  }

  const inputArgs = {
    id,
    isCorrect,
    correct,
    answer,
  }

  return (
    <section className={styles.container}>
      <h1>
        <StatusBall statusColor={statusColor} />
        {title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {choices && <ChoicesReply {...choiceArgs} />}
      {!choices && <InputReply {...inputArgs} />}
    </section>
  )
}

export default Card
