import React from "react"
import { CSSTransition } from "react-transition-group"

import styles from "./fail.module.css"

const FailMessage = ({ failed, setFailed }) => {
  return (
    <div>
      <CSSTransition
        in={failed}
        timeout={1000}
        onEntered={() => setFailed(false)}
        classNames={{ ...styles }}
      >
        <section className={styles.message}>Nope.</section>
      </CSSTransition>
    </div>
  )
}

export default FailMessage
