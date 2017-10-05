// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Payment from '../src/Containers/Payment'
import PaymentPending from '../src/Containers/PaymentPending'
import PaymentSuccess from '../src/Containers/PaymentSuccess'

const Index = (props) => {
  let { type } = props.query

  if (type === 'finish') {
    let params = {
      style: 'main user user-success',
      header: {
        title: 'Pembayaran berhasil'
      }
    }
    return (
      <DynamicNavBarLayout {...params} {...props}>
        <PaymentSuccess {...props} />
      </DynamicNavBarLayout>
    )
  }

  if (type === 'unfinish' || type === 'error') {
    let params = {
      style: 'main user user-success',
      header: {
        title: 'Pembayaran unfinish'
      }
    }
    return (
      <DynamicNavBarLayout {...params} {...props}>
        <PaymentPending {...props} />
      </DynamicNavBarLayout>
    )
  }

  if (!type) {
    let params = {
      style: 'main no-padding-bottom bg-grey',
      header: {
        title: 'Pembayaran'
      },
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: 'Pembayaran'
      }
    }
    return (
      <DefaultLayout {...params} {...props}>
        <Payment {...props} />
      </DefaultLayout>
    )
  }
}

export default ReduxPageWrapper(Index)
