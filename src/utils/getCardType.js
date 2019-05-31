export const getCardType = (choices, isFlash) => {
  if (isFlash) return "flash"
  if (choices) return "choices"
  return "input"
}