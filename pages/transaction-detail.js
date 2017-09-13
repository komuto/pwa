// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TransactionDetail from '../src/Containers/TransactionDetail'
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

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <TransactionDetail query={props.query} />
    </DefaultLayout>
  )
}
export default ReduxPageWrapper(Index)
