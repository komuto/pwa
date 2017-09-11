// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentConfirmation from '../src/Containers/PaymentConfirmation'
// style custom
const params = {
  style: 'main detail edit-data',
  header: {
    title: 'Konfirmasi Pembayaran'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Konfirmasi Pembayaran'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <PaymentConfirmation query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
