import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"

import StatusBall from "./statusBall"
import shuffleArray from "../utils/shuffleArray"

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
  
  // Save answer locally, just to track when it's wrong.
  // This way, I can track the wrong answers only while the user is on the page.
  const [currentAnswer, localAnswer] = useState(null)
  const [inputAnswer, changeInputAnswer] = useState("")
  const inputRef = useRef()
  const inputId = "input" + id
  let choiceList = null

  useEffect(() => {
    if (isCorrect) changeInputAnswer(correct)
  }, [])

  if (choices) {
    const shuffledChoices =  shuffleArray(choices)
    choiceList = shuffledChoices.map(choice => {
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

      {choiceList && choiceList}
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
