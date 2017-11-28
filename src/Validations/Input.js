
const inputNormal = (input) => {
  return input.replace(/[^a-zA-Z0-9 {2}?!.,]/g, '')
}

const inputString = (input) => {
  return input.replace(/[^a-zA-Z ]/g, '')
}

const inputNumber = (input) => {
  return input.replace(/[^0-9]/g, '')
}

const inputPhoneNumber = (input) => {
  return input.replace(/[^+?\d]/g, '')
}

/**
  * prefix handphone list
  +62811/, /+62812/, /+62813/, /+62851/, /+62852/, /+62853/, /+62823/, /0811/, /0812/, /0813/, /0851/, /0852/, /0853/, /0823/, // telkomsel
  /+62856/, /+62855/, /+62857/, /+62815/, /+62816/, /+62858/, /0856/, /0855/, /0857/, /0815/, /0816/, /0858/, // indosat
  /+62859/, /+62817/, /+62818/, /+62819/, /+62878/, /+62877/, /0859/, /0817/, /0818/, /0819/, /0878/, /0877/, // XL
  /+6283/, /083/, // axis
  /+6289/, /098/ // three
*/
const isValidPhoneNumber = (input) => {
  const prefixPhoneList = /(\+62|62|0)(811|812|813|851|852|853|823|856|855|857|815|816|858|859|817|818|819|878|877|83|89|98)/g
  return prefixPhoneList.test(input)
}

export {
  inputNormal,
  inputString,
  inputNumber,
  inputPhoneNumber,
  isValidPhoneNumber
}
