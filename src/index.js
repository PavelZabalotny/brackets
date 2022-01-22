module.exports = function check(str, bracketsConfig) {
  // If srt length is odd - false
  if (str.length % 2 !== 0) {
    return false
  }

  const OPEN_BRACKETS = []
  let END_BRACKETS = {}
  // Fill OPEN_BRACKETS and END_BRACKETS
  bracketsConfig.forEach(arr => {
    let startBracket = arr[0]
    OPEN_BRACKETS.push(startBracket)
    let endBracket = arr[1]
    END_BRACKETS = {...END_BRACKETS, [endBracket]: startBracket}
  })

  const stack = []

  for (let i = 0; i < str.length; i++) {
    let currentBracket = str[i]
    let lastStackBracket = stack[stack.length - 1]

    if (OPEN_BRACKETS.includes(currentBracket)) {
      // If open and close brackets are the same
      if (lastStackBracket && END_BRACKETS[lastStackBracket] === currentBracket) {
        stack.pop()
      } else {
        stack.push(currentBracket)
      }

    } else {
      if (stack.length === 0) {
        return false
      }

      if (END_BRACKETS[currentBracket] === lastStackBracket) {
        stack.pop()
      } else {
        return false
      }
    }
  }

  return stack.length === 0
}
