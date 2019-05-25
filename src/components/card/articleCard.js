import React, { useState } from "react"
import classnames from "classnames"

import styles from "./card.module.css"
import StatusBall from "../statusBall"
import ChoicesReply from "./choicesReply"
import InputReply from "./inputReply"
import Arrow from "../arrow/arrow"

const cardColor = (id, cardsById) => {
  if (id in cardsById) return [true, "green"]
  return [null, "gray"]
}

function Card({
  id,
  expanded,
  cardsById,
  answer,
  correct,
  title,
  html,
  choices,
}) {
  const [isCorrect, statusColor] = cardColor(id, cardsById)
  const [isExpanded, toggleExpanded] = useState(expanded)

  const toggle = () => {
    toggleExpanded(c => !c)
  }

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

  const body = (
    <section className={styles.body}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {choices && <ChoicesReply {...choiceArgs} />}
      {!choices && <InputReply {...inputArgs} />}
    </section>
  )

  const hdr = classnames(styles.header, { [styles.expanded]: isExpanded })

  return (
    <section className={styles.container}>
      <header className={hdr} onClick={toggle}>
        <Arrow isExpanded={isExpanded} />
        <span className={styles.title}>{title}</span>
        <StatusBall statusColor={statusColor} />
      </header>

      {isExpanded && body}
    </section>
  )
}

export default Card
