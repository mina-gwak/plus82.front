export const convertToSentence = (text: string) => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, match => match.toUpperCase())
}
