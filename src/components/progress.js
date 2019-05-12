import React from "react"

const Progress = ({ resetProgress, totalCards, correctCardsCount }) => {
  const cardsMissing = totalCards - correctCardsCount
  const squares = []

  for (let i = 0; i < correctCardsCount; i++) {
    squares.push(<div key={"c" + i} className="correct-square" />)
  }

  for (let i = 0; i < cardsMissing; i++) {
    squares.push(<div key={"m" + i} className="missing-square" />)
  }

  return (
    <>
      <h2>
        Your progress ({correctCardsCount} / {totalCards}):
      </h2>
      <div className="progress-squares">{squares}</div>

      {correctCardsCount > 0 && (
        <button className="reset-btn" onClick={resetProgress}>
          Reset Progress
        </button>
      )}
    </>
  )
}

export default Progress
