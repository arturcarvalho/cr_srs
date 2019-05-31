import React from "react"
import classnames from "classnames"

import styles from "./grade.module.css"

/**
 *
 * @param {string} type Can be tryagain | hard | good | easy | next
 */
const GradeButton = ({ type, onNext }) => {
  let txt
  let quality

  if (type === "tryagain") {
    quality = 0
    txt = "Try again tomorrow"
  }

  if (type === "next") {
    quality = 0
    txt = "Next"
  }

  if (type === "hard") {
    quality = 3
    txt = "Hard"
  }
  if (type === "good") {
    quality = 4
    txt = "Good"
  }
  if (type === "easy") {
    quality = 5
    txt = "Easy"
  }

  return (
    <button
      onClick={() => onNext(quality)}
      className={styles.button}
      type="button"
    >
      {txt}
    </button>
  )
}

const Grade = ({ onNext, repliedCorrectly, isFlash }) => {
  let cls = classnames(styles.grade, styles.spaced)
  let content

  if (isFlash) {
    // show try again tomorrow, hard, good, easy
    content = (
      <>
        <GradeButton type={"tryagain"} onNext={onNext} />
        <GradeButton type={"hard"} onNext={onNext} />
        <GradeButton type={"good"} onNext={onNext} />
        <GradeButton type={"easy"} onNext={onNext} />
      </>
    )
  } else if (repliedCorrectly) {
    // show hard, good, easy
    content = (
      <>
        <GradeButton type={"hard"} onNext={onNext} />
        <GradeButton type={"good"} onNext={onNext} />
        <GradeButton type={"easy"} onNext={onNext} />
      </>
    )
  } else {
    // user failed, so just show next
    cls = classnames(styles.grade, styles.centered)
    content = <GradeButton type={"next"} onNext={onNext} />
  }

  return <section className={cls}>{content}</section>
}

export default Grade
