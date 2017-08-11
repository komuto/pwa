// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TransactionDetailBankTransfer from '../src/Containers/TransactionDetailBankTransfer'
// style custom
const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Detail Transaksi'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Detail Transaksi'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <TransactionDetailBankTransfer />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
