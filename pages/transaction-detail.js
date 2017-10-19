import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TransactionDetail from '../src/Containers/Transaction/Detail'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey',
    header: {
      title: 'Detail Transaksi'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push(`/transaction`),
      textPath: 'Detail Transaksi'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <TransactionDetail {...props} />
    </DefaultLayout>
  )
}
export default ReduxPageWrapper(Index)
