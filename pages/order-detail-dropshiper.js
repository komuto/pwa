// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import OrderDetailDropshiper from '../src/Containers/OrderDetailDropshiper'

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
      <OrderDetailDropshiper {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)