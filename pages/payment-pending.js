// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentPending from '../src/Containers/PaymentPending'

const Index = (props) => {
  const params = {
    style: 'main user user-success',
    header: {
      title: 'Pembayaran ditunda'
    }
  }

  return (
    <DynamicNavBarLayout {...params} {...props}>
      <PaymentPending {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
