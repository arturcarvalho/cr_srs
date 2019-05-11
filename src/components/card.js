import React from "react"

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

  let choiceList = null

  if (choices) {
    choiceList = choices.map(choice => {
      return (
        <div key={choice}>
          <button
            className="card-choice"
            onClick={() => {
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
