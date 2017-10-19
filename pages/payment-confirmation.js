// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentConfirmation from '../src/Containers/Payment/Confirmation'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <PaymentConfirmation {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
