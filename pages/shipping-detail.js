// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShippingDetail from '../src/Containers/ShippingDetail'

const params = {
  style: 'main seller',
  header: {
    title: 'Detail Pengiriman'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Detail Pengiriman'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ShippingDetail />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
