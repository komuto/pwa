// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentBankTransfer from '../src/Containers/PaymentBankTransfer'
// style custom
const params = {
  style: 'main detail bg-grey',
  header: {
    title: 'Transfer Bank'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Transfer Bank'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <PaymentBankTransfer query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
