// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentBankTransferDetail from '../src/Containers/PaymentBankTransferDetail'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey',
    header: {
      title: 'Detail Transaksi'
    }
  }

  return (
    <DynamicNavBarLayout {...params} {...props}>
      <PaymentBankTransferDetail {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
