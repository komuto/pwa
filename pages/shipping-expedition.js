// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShippingExpedition from '../src/Containers/ShippingExpedition'

const params = {
  style: 'main seller',
  header: {
    title: 'Ekspedisi Pengiriman'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Ekspedisi Pengiriman'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ShippingExpedition query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
