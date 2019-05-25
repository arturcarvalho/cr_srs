import React, { useState } from "react"
import { Link } from "gatsby"

import StatusBall from "./statusBall"
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
  learnMoreUrl,
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
    <section className="card-container">
      <h1>
        <StatusBall statusColor={statusColor} />
        {title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {choices && <ChoicesReply {...choiceArgs} />}
      {!choices && <InputReply {...inputArgs} />}

      <section className="card-more">
        <Link to={learnMoreUrl}>Learn more</Link>
      </section>
    </section>
  )
}

export default Card
