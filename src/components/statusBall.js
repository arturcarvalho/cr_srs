import React from "react"

export const StatusBall = ({ isCorrect }) => {
  const ballClass = ["ball"]
  if (isCorrect === null) ballClass.push("empty-ball")
  else if (isCorrect) ballClass.push("correct-ball")
  else ballClass.push("incorrect-ball")

  return <span className={ballClass.join(" ")} />
}

export default StatusBall
