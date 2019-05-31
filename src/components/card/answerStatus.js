import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"

import styles from "./status.module.css"

/**
 *
 * @param { isCorrect } show message if answer changed
 * @param { dontShow } don't show any message if it's a flash card 
 */
const AnswerStatus = ({ isCorrect, dontShow }) => {
  // Just store the initial isCorrect value so that
  // the user can see the info ONLY if the state changes.
  const [initialCorrectness] = useState(isCorrect)
  let showGoodJob
  if (dontShow) {
    showGoodJob = false
  } else {
    showGoodJob = isCorrect && initialCorrectness !== isCorrect
  }

  return (
    <section>
      <CSSTransition in={showGoodJob} timeout={4000} classNames={{ ...styles }}>
        <p className={styles.status}>Good Job!</p>
      </CSSTransition>
    </section>
  )
}

export default AnswerStatus
