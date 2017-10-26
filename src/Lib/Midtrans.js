/** include depedencies */
import Router from 'next/router'
/** defaine redirect url */
const urlFinish = (i) => ['/payment?type=finish', '/balance?type=topup&status=finish'][i]
const urlUnFinish = (i) => ['/payment?type=unfinish', '/balance?type=topup&status=unfinish'][i]
const urlError = (i) => ['/payment?type=error', '/balance?type=topup&status=error'][i]
const urlClose = (i) => ['/transaction', '/balance-topup'][i]

const asFinish = (i) => ['/payment?type=finish', '/balance/topup/finish'][i]
const asUnFinish = (i) => ['/payment?type=unfinish', '/balance/topup/unfinish'][i]
const asError = (i) => ['/payment?type=error', '/balance/topup/error'][i]
const asClose = (i) => ['/transaction', '/balance/topup'][i]

/** exporting */
export default ({ token, type = 'payment' }) => {
  let index = ['payment', 'balance'].indexOf(type)
  snap.pay(token, {
    onSuccess: (result) => {
      Router.push(
        urlFinish(index),
        asFinish(index)
      )
    },
    onPending: (result) => {
      Router.push(
        urlUnFinish(index),
        asUnFinish(index)
      )
    },
    onError: (result) => {
      Router.push(
        urlError(index),
        asError(index)
      )
    },
    onClose: () => {
      Router.push(
        urlClose(index),
        asClose(index)
      )
    }
  })
}
