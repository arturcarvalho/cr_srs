import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"

import StatusBall from "./statusBall"
import shuffleArray from "../utils/shuffleArray"

function Card({
  inArticle,
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
  // Save answer locally, just to track when it's wrong.
  // This way, I can track the wrong answers only while the user is on the page.
  const [currentAnswer, localAnswer] = useState(null)

  const [inputAnswer, changeInputAnswer] = useState("")
  const [shuffledChoices, shufflechoices] = useState([])

  let choiceList = null

  // componentDidMount look a like
  useEffect(() => {
    // can't put an if in case it's an input card. need to check this.
    shufflechoices(shuffleArray(choices))

    if (Boolean(inArticle) && isCorrect) changeInputAnswer(correct)
  }, [])

  if (choices) {
    choiceList = shuffledChoices.map(choice => {
      const cls = ["card-choice"]

      if (Boolean(inArticle)) {
        if (isCorrect && choice === correct) cls.push("correct-card-choice")
        if (!isCorrect && currentAnswer === choice)
          cls.push("incorrect-card-choice")
      }

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

  // else it's an input
  const inputRef = useRef()
  const inputId = "input" + id

  useEffect(() => {
    if (!choiceList) inputRef.current.focus()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (correct !== inputAnswer) changeInputAnswer("")

    answer(id, inputAnswer, correct)
  }

  return (
    <section className="card-container">
      <h3>
        <StatusBall statusColor={statusColor} />
        {title}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {choiceList && <div className="card-choices">{choiceList}</div>}
      {!choiceList && (
        <form onSubmit={handleSubmit}>
          <input
            aria-label="input answer"
            id={inputId}
            className="card-input"
            ref={inputRef}
            type="text"
            value={inputAnswer}
            onChange={e => {
              changeInputAnswer(e.target.value)
            }}
          />
          <input className="card-submit" type="submit" value="Answer" />
        </form>
      )}
      <section className="card-more">
        <Link to={learnMoreUrl}>Learn more</Link>
      </section>
    </section>
  )
}

export default Card
