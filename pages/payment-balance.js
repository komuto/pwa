// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PayWithBalance from '../src/Containers/PayWithBalance'
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
    <PayWithBalance />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
