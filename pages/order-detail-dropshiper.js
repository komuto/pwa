// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import OrderDetailDropshiper from '../src/Containers/Order/DetailDropshiper'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey lg',
    header: {
      title: 'Detail Status Pesanan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Detail Status Pesanan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <OrderDetailDropshiper {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
