// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentBalance from '../src/Containers/PaymentBalance'
// style custom
const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Bayar Dengan Saldo'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Bayar Dengan Saldo'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <PaymentBalance />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
