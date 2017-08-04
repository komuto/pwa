// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ShippingExpedition from '../src/Containers/ShippingExpedition'
// utils
import { PROFILE } from '../src/Utils/Constant'

const params = {
  style: 'main seller',
  header: {
    title: 'Ekspedisi Pengiriman'
  },
  navbar: {
    searchBoox: false,
    textPath: 'Ekspedisi Pengiriman'
  },
  tabbar: {
    active: PROFILE,
    isShow: true
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ShippingExpedition />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
