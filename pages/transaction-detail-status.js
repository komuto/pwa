// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TransactionDetailStatus from '../src/Containers/TransactionDetailStatus'
// style custom
const params = {
  style: 'main detail bg-grey',
  header: {
    title: 'Detail Pesanan'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Detail Pesanan'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <TransactionDetailStatus query={props.query} />
    </DefaultLayout>
  )
}
export default ReduxPageWrapper(Index)
