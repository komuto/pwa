// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentBankTransferDetail from '../src/Containers/PaymentBankTransferDetail'
// style custom
const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Detail Transaksi'
  }
}

const Index = (props) => {
  return (
    <DynamicNavBarLayout params={params}>
      <PaymentBankTransferDetail query={props.query} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
