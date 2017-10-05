/** include depedencies */
import Router from 'next/router'
/** defaine redirect url */
const urlFinish = (i) => ['/payment?type=finish', '/balance-topup?type=finish'][i]
const urlUnFinish = (i) => ['/payment?type=unfinish', '/balance-topup?type=unfinish'][i]
const urlError = (i) => ['/payment?type=error', '/balance-topup?type=error'][i]
const urlClose = (i) => ['/transaction', '/balance-topup'][i]

/** exporting */
export default ({ token, type = 'payment' }) => {
  let i = ['payment', 'balance'].indexOf(type)
  snap.pay(token, {
    onSuccess: (result) => {
      Router.push(urlFinish(i))
    },
    onPending: (result) => {
      Router.push(urlUnFinish(i))
    },
    onError: (result) => {
      Router.push(urlError(i))
    },
    onClose: () => {
      Router.push(urlClose(i))
    }
  })
}
