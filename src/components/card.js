import React from "react"

import MixedLink from "./mixedLink"

function Card(props) {
  const { title, html, learnMoreTitle, learnMoreUrl, choices } = props

  let choiceList = null

  if (choices) {
    choiceList = choices.map(choice => {
      return (
        <div key={choice}>
          <button>{choice}</button>
        </div>
      )
    })
  }

  return (
    <section
      style={{
        backgroundColor: "#c2c2c2",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>Card {title}</h3>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {choiceList}
      <section>
        Learn more: <MixedLink to={learnMoreUrl}>{learnMoreTitle}</MixedLink>
      </section>
    </section>
  )
}

export default Card