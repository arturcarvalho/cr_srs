import React, { useEffect, useState } from "react"

import shuffleArray from "../utils/shuffleArray"

const ChoicesReply = ({
  choices,
  isCorrect,
  correct,
  currentAnswer,
  localAnswer,
  answer,
  id,
}) => {
  const [shuffledChoices, shufflechoices] = useState([])

  useEffect(() => {
    shufflechoices(shuffleArray(choices))
  }, [])

  let choiceList = shuffledChoices.map(choice => {
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

  return <section className="card-choices">{choiceList}</section>
}

export default ChoicesReply
