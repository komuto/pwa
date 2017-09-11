// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TransactionDetail from '../src/Containers/TransactionDetail'
// style custom
const params = {
  style: 'main TransactionDetail-page bg-white',
  header: {
    title: 'Transaksi Detail'
  },
  navbar: {
    searchBoox: false,
    textPath: 'Transaksi Detail'
  },
  tabbar: {
    active: TransactionDetail,
    isShow: true
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <TransactionDetail />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
