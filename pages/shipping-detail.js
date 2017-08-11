// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShippingDetail from '../src/Containers/ShippingDetail'

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

const Index = (props) => (
  <DefaultLayout params={params}>
    <ShippingDetail query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
