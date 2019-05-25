import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"

import StatusBall from "./statusBall"
import ChoicesReply from "./choicesReply"

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

  // componentDidMount look a like
  useEffect(() => {
    if (isCorrect) changeInputAnswer(correct)
  }, [])

  // else it's an input
  const inputRef = useRef()
  const inputId = "input" + id

  // useEffect(() => {
  //   if (!choiceList) inputRef.current.focus()
  // }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (correct !== inputAnswer) changeInputAnswer("")

    answer(id, inputAnswer, correct)
  }

  const choiceArgs = {
    choices,
    isCorrect,
    correct,
    currentAnswer,
    localAnswer,
    answer,
    id,
  }

  return (
    <section className="card-container">
      <h1>
        <StatusBall statusColor={statusColor} />
        {title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {choices && <ChoicesReply {...choiceArgs} />}
      {!choices && (
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
