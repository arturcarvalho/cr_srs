import React, { useState } from "react"
import classnames from "classnames"

import styles from "./card.module.css"
import StatusBall from "../statusBall/statusBall"
import Reply from "../replies/reply"
import Arrow from "../arrow/arrow"
import AnswerStatus from "./answerStatus"

const cardStatus = (id, cardsById) => {
  if (id in cardsById) return [true, "all"]
  return [null, "none"]
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
  onAnswerInArticle,
  correct,
  title,
  html,
  choices,
  isFlash,
}) {
  const [isCorrect, status] = cardStatus(id, cardsById)
  const [isExpanded, toggleExpanded] = useState(expanded)

  const cardType = getCardType(choices, isFlash)

  const toggle = () => {
    toggleExpanded(cardExpanded => !cardExpanded)
  }

  const replyArgs = { id, isCorrect, correct, choices, cardType }

  const bodySection = (
    <section className={styles.body}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <AnswerStatus dontShow={isFlash} isCorrect={isCorrect} />
      <Reply {...replyArgs} onAnswer={onAnswerInArticle} />
    </section>
  )

  const hdr = classnames(styles.header, { [styles.expanded]: isExpanded })

  return (
    <section className={styles.container}>
      <header className={hdr} onClick={toggle}>
        <Arrow isExpanded={isExpanded} />
        <span className={styles.title}>{title}</span>
        <StatusBall status={status} />
      </header>

      {isExpanded && bodySection}
    </section>
  )
}

export default Card
