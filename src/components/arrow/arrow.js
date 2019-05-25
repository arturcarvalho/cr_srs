import React from "react"
import classnames from "classnames"

import styles from "./arrow.module.css"

export default ({ isExpanded }) => {
  const cls = classnames(styles.arrow, { [styles.down]: isExpanded })

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className={cls}
    >
      <path
        className={styles.path}
        d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"
      />
    </svg>
  )
}
