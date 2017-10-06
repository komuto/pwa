// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import OrderDetail from '../src/Containers/OrderDetail'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey lg',
    header: {
      title: 'Detail Pesanan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Detail Pesanan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <OrderDetail {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
