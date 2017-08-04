export const AMOUNT_PRODUCT = 'AMOUNT_PRODUCT'
export const ADDRESS_SELECTED = 'ADDRESS_SELECTED'
export const SHIPPING_INFORMATION = 'SHIPPING_INFORMATION'
export const COURIER_EXPEDITION = 'COURIER_EXPEDITION'
export const PACKAGE_EXPEDITION = 'PACKAGE_EXPEDITION'
export const INSURANCE = 'INSURANCE'
export const NOTED = 'NOTED'

function addressSelected (params) {
  return {
    type: ADDRESS_SELECTED,
    ...params
  }
}

function amountProduct (params) {
  return {
    type: AMOUNT_PRODUCT,
    ...params
  }
}

function shippingInformation (params) {
  return {
    type: SHIPPING_INFORMATION,
    ...params
  }
}

function courierExpedition (params) {
  return {
    type: COURIER_EXPEDITION,
    ...params
  }
}

function packageExpedition (params) {
  return {
    type: PACKAGE_EXPEDITION,
    ...params
  }
}

function insurance (params) {
  return {
    type: INSURANCE,
    ...params
  }
}

function noted (params) {
  return {
    type: NOTED,
    ...params
  }
}

export {
  addressSelected,
  amountProduct,
  shippingInformation,
  courierExpedition,
  packageExpedition,
  noted,
  insurance
}
