import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"

import styles from "./status.module.css"

const AnswerStatus = ({ isCorrect }) => {
  // Just store the initial isCorrect value so that
  // the user can see the info ONLY if the state changes.
  const [initialCorrectness] = useState(isCorrect)
  const showGoodJob = isCorrect && initialCorrectness !== isCorrect

  return (
    <section>
      <CSSTransition in={showGoodJob} timeout={4000} classNames={{ ...styles }}>
        <p className={styles.status}>Good Job!</p>
      </CSSTransition>
    </section>
  )
}

export default AnswerStatus
