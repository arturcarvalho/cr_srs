import React from "react"
import { Link } from "gatsby"

const BonusTraining = ({ cardsToReview }) => {
  if (cardsToReview.length === 0) return <em>Nothing for the moment.</em>

  const randElem =
    cardsToReview[Math.floor(Math.random() * cardsToReview.length)]

  return (
    <section className="bonus-training">
      <Link to={`/cards/${randElem}`} className="start-bonus-training">
        <span className="bonus-count">{cardsToReview.length}</span>
        <span className="bonus-start">Start</span>
      </Link>
    </section>
  )
}

export default BonusTraining
