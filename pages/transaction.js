// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Transaction from '../src/Containers/Transaction'
// style custom
const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Transaksi'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Transaksi'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <Transaction />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
