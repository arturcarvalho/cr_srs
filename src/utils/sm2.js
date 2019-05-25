/**
 * Super Memo 2
 * https://psychology.stackexchange.com/questions/16828/specification-of-supermemo-2
 * https://stackoverflow.com/questions/49047159/spaced-repetition-algorithm-from-supermemo-sm-2/49047160#49047160
 */

function calculateEasiness(easiness, grade) {
  return Math.max(1.3, easiness - 0.8 + 0.28 * grade - 0.02 * grade * grade)
}

function getNextPracticeDate(days) {
  let now = new Date()
  now.setHours(0, 0, 0, 0)
  now.setDate(now.getDate() + days)
  return now
}

export const defaultCard = {
  repetitions: 0, // consecutive times answer was correct
  easiness: 2.5, // difficulty
  interval: 1, // interval in days (next practice is based on this interval)
  nextPracticeDate: getNextPracticeDate(1),
}

/**
 *
 * @param {*} grade - grade of the answer from 0 to 5
 * @param {*} card - flash card
 */
const sm2 = (grade, card = defaultCard) => {
  const { repetitions, easiness, interval } = card
  const updCard = {} // updated card

  // repetitions
  updCard.repetitions = grade < 3 ? 0 : repetitions + 1

  // interval
  if (updCard.repetitions <= 1) {
    updCard.interval = 1
  } else if (updCard.repetitions === 2) {
    updCard.interval = 6
  } else {
    updCard.interval = Math.round(interval * easiness)
  }

  // easiness factor
  updCard.easiness = calculateEasiness(easiness, grade)

  // next practice
  updCard.nextPracticeDate = getNextPracticeDate(interval)
  return updCard
}

/**
 * TO TEST
  if grade 4, easiness the same...
  console.log(sm2(4, { repetitions: 1, interval: 1, easiness: 2.5 }))
  console.log(sm2(4, { repetitions: 2, interval: 6, easiness: 2.5 }))
  console.log(sm2(5, { repetitions: 3, interval: 15, easiness: 2.5 }))
 */

export default sm2
