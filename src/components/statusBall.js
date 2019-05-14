import React from "react"

export const StatusBall = ({ statusColor }) => {
  const ballClass = `ball ${statusColor}-ball`

  return <span className={ballClass} />
}

export default StatusBall
