import React, { useRef, useState, useEffect } from "react"

import FailMessage from "../messages/failMessage"
import styles from "./input.module.css"

const InputReply = ({ id, isCorrect, correct, onAnswer }) => {
  const inputRef = useRef()
  const inputId = "input" + id

  const [inputAnswer, changeInputAnswer] = useState("")
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (isCorrect) changeInputAnswer(correct)
  }, [])

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    if (correct !== inputAnswer) changeInputAnswer("")

    const right = inputAnswer === correct
    onAnswer(id, right)
    setFailed(!right)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoComplete="off"
        aria-label="input answer"
        id={inputId}
        className={styles.input}
        ref={inputRef}
        type="text"
        value={inputAnswer}
        onChange={e => {
          changeInputAnswer(e.target.value)
        }}
      />
      <input className={styles.submit} type="submit" value="Answer" />
      <FailMessage failed={failed} setFailed={setFailed} />
    </form>
  )
}

export default InputReply
