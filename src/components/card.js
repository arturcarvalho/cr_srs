import React from "react"

function Card(props) {
  const { id } = props

  return (
    <>
      <h3>Card {id}</h3>
      <p>this is a card</p>
    </>
  )
}

export default Card
