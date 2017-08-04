import * as purchaseActions from '../actions/purchase'

const initAmountProduct = {
  amountProduct: 1
}

const initAddressSelected = {
  status: false
}

const initShippingInformation = {
  alias: '',
  recipient: '',
  handphone: '',
  address: '',
  provinces: {
    id: null,
    name: null
  },
  districts: {
    id: null,
    name: null
  },
  subDistricts: {
    id: null,
    name: null
  },
  villages: {
    id: null,
    name: null
  },
  postalCode: '',
  isFound: false
}

const initCourierExpedition = {
  id: null,
  insurance_fee: 0,
  is_checked: false,
  logo: null,
  name: ''
}

const initPackageExpedition = {
  cost: 0,
  description: null,
  etd: '',
  full_name: '',
  id: null,
  name: '',
  isFound: false
}

const initNote = {
  noted: ''
}

const initInsurance = {
  insurance: null
}

function addressSelected (state = initAddressSelected, action) {
  switch (action.type) {
    case purchaseActions.ADDRESS_SELECTED:
      return {
        ...state,
        ...action
      }
    default:
      return state
  }
}

function amountProduct (state = initAmountProduct, action) {
  switch (action.type) {
    case purchaseActions.AMOUNT_PRODUCT:
      return {
        ...state,
        amountProduct: action.amountProduct
      }
    default:
      return state
  }
}

function shippingInformation (state = initShippingInformation, action) {
  switch (action.type) {
    case purchaseActions.SHIPPING_INFORMATION:
      return {
        ...state,
        alias: action.alias,
        recipient: action.recipient,
        handphone: action.handphone,
        address: action.address,
        provinces: action.provinces,
        districts: action.districts,
        subDistricts: action.subDistricts,
        villages: action.villages,
        postalCode: action.postalCode,
        isFound: action.isFound
      }
    default:
      return state
  }
}

function courierExpedition (state = initCourierExpedition, action) {
  switch (action.type) {
    case purchaseActions.COURIER_EXPEDITION:
      return {
        ...state,
        id: action.id,
        insurance_fee: action.insurance_fee,
        is_checked: action.is_checked,
        logo: action.logo,
        name: action.name
      }
    default:
      return state
  }
}

function packageExpedition (state = initPackageExpedition, action) {
  switch (action.type) {
    case purchaseActions.PACKAGE_EXPEDITION:
      return {
        ...state,
        cost: action.cost,
        description: action.description,
        etd: action.etd,
        full_name: action.full_name,
        id: action.id,
        name: action.name,
        isFound: action.isFound
      }
    default:
      return state
  }
}

function insurance (state = initInsurance, action) {
  switch (action.type) {
    case purchaseActions.INSURANCE:
      return {
        ...state,
        insurance: action.insurance
      }
    default:
      return state
  }
}

function noted (state = initNote, action) {
  switch (action.type) {
    case purchaseActions.NOTED:
      return {
        ...state,
        noted: action.noted
      }
    default:
      return state
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
