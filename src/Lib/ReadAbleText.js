const ReadAbleText = (param) => {
  // remove double space
  param = param.replace(/-/g, ' ')
  param = param.toLowerCase().replace(/\b[a-z]/g, (letter) => {
    return letter.toUpperCase()
  })
  return param
}

export default ReadAbleText
