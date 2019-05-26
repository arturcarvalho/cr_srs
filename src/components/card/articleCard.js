import React, { useState } from "react"
import classnames from "classnames"

import styles from "./card.module.css"
import StatusBall from "../statusBall"
import ChoicesReply from "./choicesReply"
import InputReply from "./inputReply"
import FlashReply from "./flashReply"
import Arrow from "../arrow/arrow"

const cardColor = (id, cardsById) => {
  if (id in cardsById) return [true, "green"]
  return [null, "gray"]
}

const getCardType = (choices, isFlash) => {
  if (isFlash) return "flash"
  if (choices) return "choices"
  return "input"
}

function Card({
  id,
  expanded,
  cardsById,
  answerInArticle,
  correct,
  title,
  html,
  choices,
  isFlash,
}) {
  const [isCorrect, statusColor] = cardColor(id, cardsById)
  const [isExpanded, toggleExpanded] = useState(expanded)

  const cardType = getCardType(choices, isFlash)
  const toggle = () => {
    toggleExpanded(c => !c)
  }

  const args = { id, isCorrect, correct, answerInArticle }
  const choiceArgs = { ...args, choices }
  const inputArgs = { ...args }

  const replySection = (
    <section className={styles.body}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {cardType === "choices" && <ChoicesReply {...choiceArgs} />}
      {cardType === "input" && <InputReply {...inputArgs} />}
      {cardType === "flash" && <FlashReply />}
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

      {isExpanded && replySection}
    </section>
  )
}

export default Card
