const showArticleStatus = (cards, cardsById) => {
  const articleCards = cards.map(c => c.node.fields.id)

  const correctCards = articleCards.reduce((tot, cardId) => {
    return cardId in cardsById ? tot + 1 : tot
  }, 0)

  if (articleCards.length === correctCards) return "all" // all cards correct
  if (correctCards === 0) return "none"
  if (correctCards > 0) return "some"
}

export default showArticleStatus
