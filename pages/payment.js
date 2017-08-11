// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Payment from '../src/Containers/Payment'
// style custom
const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Pembayaran'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Pembayaran'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <Payment />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
