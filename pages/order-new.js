// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import OrdersNew from '../src/Containers/Order/New'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Pesanan Baru'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/sales'),
      textPath: 'Pesanan Baru'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <OrdersNew {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
