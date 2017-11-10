
const inputNormal = (input) => {
  return input.replace(/[^a-zA-Z0-9 {2}?!.,]/g, '')
}

const inputString = (input) => {
  return input.replace(/[^a-zA-Z ]/g, '')
}

const inputNumber = (input) => {
  return input.replace(/[^0-9]/g, '')
}

export {
  inputNormal,
  inputString,
  inputNumber
}
