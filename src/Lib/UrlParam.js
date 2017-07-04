const UrlParam = (param) => {
  // remove special character
  param = param.replace(/[^a-zA-Z ]/g, '')
  // remove double space
  param = param.replace(/\s\s+/g, ' ')
  // change space to -
  param = param.replace(/\s+/g, '-')

  return param.toLowerCase()
}

export default UrlParam
