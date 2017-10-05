/** include depedencies */
import Router from 'next/router'
/** defaine redirect url */
const urlFinish = (i) => ['/payment?type=finish', '/balance-topup?type=finish'][i]
const urlUnFinish = (i) => ['/payment?type=unfinish', '/balance-topup?type=unfinish'][i]
const urlError = (i) => ['/payment?type=error', '/balance-topup?type=error'][i]
const urlClose = (i) => ['/transaction', '/balance-topup'][i]

/** exporting */
export default ({ token, type = 'payment' }) => {
  let index = ['payment', 'balance'].indexOf(type)
  snap.pay(token, {
    onSuccess: (result) => {
      Router.push(urlFinish(index))
    },
    onPending: (result) => {
      Router.push(urlUnFinish(index))
    },
    onError: (result) => {
      Router.push(urlError(index))
    },
    onClose: () => {
      Router.push(urlClose(index))
    }
  })
}
