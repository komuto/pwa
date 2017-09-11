// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Transaction from '../src/Containers/Transaction'
// utils
import { TRANSACTION } from '../src/Utils/Constant'
// style custom
const params = {
  style: 'main transaction-page bg-white',
  header: {
    title: 'Transaksi'
  },
  navbar: {
    searchBoox: false,
    textPath: 'Transaksi'
  },
  tabbar: {
    active: TRANSACTION,
    isShow: true
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <Transaction />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
