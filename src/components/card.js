import React, { useState } from "react"

import MixedLink from "./mixedLink"
import StatusBall from "./statusBall"

function Card(props) {
  const {
    id,
    answer,
    isCorrect,
    correct,
    title,
    html,
    learnMoreTitle,
    learnMoreUrl,
    choices,
  } = props

  // Save answer locally, just to track when it's wrong.
  // This way, I can track the wrong answers only while the user is on the page.
  const [currentAnswer, localAnswer] = useState(null)
  let choiceList = null

  if (choices) {
    choiceList = choices.map(choice => {
      const cls = ["card-choice"]

      if (isCorrect && choice === correct) cls.push("correct-card-choice")
      if (!isCorrect && currentAnswer === choice)
        cls.push("incorrect-card-choice")
      return (
        <div key={choice}>
          <button
            className={cls.join(" ")}
            onClick={() => {
              localAnswer(choice)
              answer(id, choice, correct)
            }}
          >
            {choice}
          </button>
        </div>
      )
    })
  }

  return (
    <section className="card-container">
      <h3>
        <StatusBall isCorrect={isCorrect} />
        Card {title}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {choiceList}
      <section>
        Learn more: <MixedLink to={learnMoreUrl}>{learnMoreTitle}</MixedLink>
      </section>
    </section>
  )
}

export default Card
