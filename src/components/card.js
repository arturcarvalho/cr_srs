import React from "react"

import MixedLink from "./mixedLink"

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

  const ballClass = ["ball"]
  if (isCorrect === null) ballClass.push("empty-ball")
  else if (isCorrect) ballClass.push("correct-ball")
  else ballClass.push("incorrect-ball")

  return (
    <section className="card-container">
      <h3>
        <span className={ballClass.join(" ")} />
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
