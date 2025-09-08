export const copy = async (text: string) => {
  let success = false

  if (!navigator.clipboard) {
    return { success }
  }

  try {
    await navigator.clipboard.writeText(text)
    success = true
  } catch (error) {
    success = false
  }

  return { success }
}
