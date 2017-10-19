// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentBalance from '../src/Containers/Payment/Balance'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <PaymentBalance {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
