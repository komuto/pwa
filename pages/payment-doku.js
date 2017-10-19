// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentDoku from '../src/Containers/Payment/Doku'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Doku Wallet'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Doku Wallet'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <PaymentDoku {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
