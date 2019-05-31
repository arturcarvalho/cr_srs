import React, { useState } from "react"
import { Link, navigate } from "gatsby"

import styles from "./reviewCard.module.css"
import Reply from "../replies/reply"
import { getCardType } from "../../utils/getCardType"
import Answer from "../answer/answer"
import Grade from "../grade/grade"

function Card({
  id,
  correct,
  title,
  html,
  choices,
  isFlash,
  learnMoreUrl,
  cardsToReview,
  currentCard,
  onAnswerInReview,
}) {
  const cardType = getCardType(choices, isFlash)
  const replyArgs = { id, correct, choices, cardType }
  const [userReply, setUserReply] = useState({
    replied: false,
    repliedCorrectly: null,
  })

  const onAnswer = (_, repliedCorrectly) => {
    setUserReply({ replied: true, repliedCorrectly })
  }

  const onNext = grade => {
    const possibleCards = cardsToReview.filter(card => card !== id)

    onAnswerInReview(id, grade, currentCard)

    if (possibleCards.length === 0) {
      // if no more go to /
      navigate("/")
    } else {
      // if not select a random next card
      const nextCard = possibleCards[~~(Math.random() * possibleCards.length)]
      navigate(`/cards/${nextCard}`)
    }
  }

  let replySection
  if (userReply.replied) {
    replySection = (
      <>
        <Answer correct={correct} />
        <Grade
          onNext={onNext}
          repliedCorrectly={userReply.repliedCorrectly}
          isFlash={isFlash}
        />
      </>
    )
  } else {
    replySection = <Reply {...replyArgs} onAnswer={onAnswer} />
  }

  const bodySection = (
    <section className={styles.body}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className={styles.reply}>{replySection}</div>
    </section>
  )

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span className={styles.title}>{title}</span>
      </header>

      {bodySection}
      <section className={styles.learn}>
        <Link to={learnMoreUrl}>Learn more</Link>
      </section>
    </section>
  )
}

export default Card
