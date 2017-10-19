// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PaymentForMobile from '../src/Containers/Payment/ForMobile'

const Index = (props) => {
  let { type } = props.query
  if (type) {
    return null
  } else {
    let params = {
      style: 'main no-padding-bottom bg-with',
      header: {
        title: 'Pembayaran'
      },
      navbar: {
        searchBoox: false,
        textPath: 'Pembayaran'
      }
    }
    return (
      <DefaultLayout {...params} {...props}>
        <PaymentForMobile {...props} />
      </DefaultLayout>
    )
  }
}

export default ReduxPageWrapper(Index)
