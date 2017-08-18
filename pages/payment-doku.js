// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentDoku from '../src/Containers/PaymentDoku'
// style custom
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

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <PaymentDoku query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
