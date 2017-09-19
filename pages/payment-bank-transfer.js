// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentBankTransfer from '../src/Containers/PaymentBankTransfer'

const Index = (props) => {
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

  return (
    <DefaultLayout {...params} {...props}>
      <PaymentBankTransfer {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
