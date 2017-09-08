// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentPending from '../src/Containers/PaymentPending'
const params = {
  style: 'main user user-success',
  header: {
    title: 'Pembayaran ditunda'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <PaymentPending />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
