// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentSuccess from '../src/Containers/PaymentSuccess'

const Index = (props) => {
  const params = {
    style: 'main user user-success',
    header: {
      title: 'Pembayaran berhasil'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <PaymentSuccess {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
