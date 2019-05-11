import React from "react"

export const StatusBall = props => {
  const ballClass = ["ball"]
  if (props.isCorrect === null) ballClass.push("empty-ball")
  else if (props.isCorrect) ballClass.push("correct-ball")
  else ballClass.push("incorrect-ball")

  return <span className={ballClass.join(" ")} />
}

export default StatusBall
