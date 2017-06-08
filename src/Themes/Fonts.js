// @flow

let FONT_SMALL = 16
let FONT_REGULAR = 14
let FONT_MEDIUM = 12

const type = {
  base: 'ProximaNova-Regular',
  bold: 'ProximaNova-Bold',
  semibold: 'ProximaNova-Semibold'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  input: 18,
  regular: FONT_REGULAR,
  medium: FONT_MEDIUM,
  small: FONT_SMALL,
  tiny: 8.5
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  }
}

export default {
  type,
  size,
  style
}
