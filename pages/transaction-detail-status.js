import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import TransactionDetailStatus from '../src/Containers/TransactionDetailStatus'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Detail Pesanan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push(`/transaction-detail?id=${props.query.id}`),
      textPath: 'Detail Pesanan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <TransactionDetailStatus {...props} />
    </DefaultLayout>
  )
}
export default ReduxPageWrapper(Index)
