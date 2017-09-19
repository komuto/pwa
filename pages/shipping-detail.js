// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShippingDetail from '../src/Containers/ShippingDetail'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Detail Pengiriman'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Detail Pengiriman'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ShippingDetail {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
