import React from "react"

import styles from "./flash.module.css"

const FlashReply = ({ onAnswer }) => {
  return (
    <button className={styles.btn} onClick={onAnswer}>
      Show Answer
    </button>
  )
}

export default FlashReply
