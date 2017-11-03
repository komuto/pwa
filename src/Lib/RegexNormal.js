const RegexNormal = (text) => String(text).replace(/[^a-zA-Z0-9 ?!.,]/g, '')
export default RegexNormal
