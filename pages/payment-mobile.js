// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentForMobile from '../src/Containers/PaymentForMobile'
// style custom
const params = {
  style: 'main no-padding-bottom bg-with',
  header: {
    title: 'Pembayaran'
  },
  navbar: {
    searchBoox: false,
    textPath: 'Pembayaran'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <PaymentForMobile query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
