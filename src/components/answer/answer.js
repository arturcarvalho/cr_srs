import React from "react"

import styles from "./answer.module.css"

const answer = ({ correct }) => {
  return (
    <section className={styles.answer}>
      <header>Correct answer:</header>
      <blockquote>{correct}</blockquote>
    </section>
  )
}

export default answer
