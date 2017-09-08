// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentSuccess from '../src/Containers/PaymentSuccess'
const params = {
  style: 'main user user-success',
  header: {
    title: 'Pembayaran berhasil'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <PaymentSuccess />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
