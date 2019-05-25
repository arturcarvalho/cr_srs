import React, { useRef, useState, useEffect } from "react"

const InputReply = ({ id, isCorrect, correct, answer }) => {
  const inputRef = useRef()
  const inputId = "input" + id

  const [inputAnswer, changeInputAnswer] = useState("")

  useEffect(() => {
    if (isCorrect) changeInputAnswer(correct)
  }, [])

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (correct !== inputAnswer) changeInputAnswer("")

    answer(id, inputAnswer, correct)
  }

  return (
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
  )
}

export default InputReply
