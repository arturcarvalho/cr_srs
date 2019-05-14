const showArticleStatus = (cards, answersById) => {
  const articleCards = cards.map(c => c.node.fields.id)

  const correctCards = articleCards.reduce((tot, cardId) => {
    const cardProgress = answersById[cardId]
    if (cardProgress && cardProgress.correct) return tot + 1

    return tot
  }, 0)

  if (articleCards.length === correctCards) return "green" // all cards correct
  if (correctCards === 0) return "gray"
  if (correctCards > 0) return "orange"
}

export default showArticleStatus
