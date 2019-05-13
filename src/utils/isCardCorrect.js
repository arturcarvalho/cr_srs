const isCardCorrect = (id, answersById) => {
  const answer = answersById[id]

  if (answer) {
    return answer.correct
  }
  return null
}

export default isCardCorrect
