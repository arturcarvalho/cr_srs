import React from "react"

import styles from "./card.module.css"
import StatusBall from "../statusBall"
import ChoicesReply from "./choicesReply"
import InputReply from "./inputReply"

const cardColor = (id, cardsById) => {
  if (id in cardsById) return [true, "green"]
  return [null, "gray"]
}

function Card({ id, cardsById, answer, correct, title, html, choices }) {
  const [isCorrect, statusColor] = cardColor(id, cardsById)

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
