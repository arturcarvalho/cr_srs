import React, { useEffect, useState } from "react"

import styles from "./choices.module.css"
import shuffleArray from "../../utils/shuffleArray"

const ChoicesReply = ({ choices, isCorrect, correct, onAnswer, id }) => {
  const [shuffledChoices, shufflechoices] = useState([])

  // Save answer locally, just to track when it's wrong.
  // This way, I can track the wrong answers only while the user is on the page.
  const [currentAnswer, localAnswer] = useState(null)

  useEffect(() => {
    shufflechoices(shuffleArray(choices))
  }, [])

  let choiceList = shuffledChoices.map(choice => {
    const cls = [styles.choice]

    if (isCorrect && choice === correct) cls.push(styles.correctChoice)
    if (!isCorrect && currentAnswer === choice)
      cls.push(cls.push(styles.incorrectChoice))

    return (
      <div key={choice}>
        <button
          className={cls.join(" ")}
          onClick={() => {
            localAnswer(choice)
            onAnswer(id, choice === correct)
          }}
        >
          {choice}
        </button>
      </div>
    )
  })

  return <section className={styles.choices}>{choiceList}</section>
}

export default ChoicesReply
