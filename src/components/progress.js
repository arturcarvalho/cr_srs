import React from "react"

const Progress = ({ resetProgress, totalCards, correctCardsCount }) => {
  return (
    <>
      <h2>Your progress:</h2>
      <div>
        {correctCardsCount} / {totalCards}
      </div>
      {correctCardsCount > 0 && (
        <button className="reset-btn" onClick={resetProgress}>Reset Progress</button>
      )}
    </>
  )
}

export default Progress
