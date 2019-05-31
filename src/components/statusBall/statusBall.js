import React from "react"
import classnames from "classnames"

import styles from "./ball.module.css"

/**
 *
 * @param { status } status: string can be "all", "some" or "none"
 */
export const StatusBall = ({ status }) => {
  const cls = classnames(styles.ball, {
    [styles.green]: status === "all",
    [styles.orange]: status === "some",
    [styles.gray]: status === "none",
  })
  return <span className={cls} />
}

export default StatusBall
