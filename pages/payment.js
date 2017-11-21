// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Payment from '../src/Containers/Payment/Payment'
import PaymentPending from '../src/Containers/Payment/Pending'
import PaymentSuccess from '../src/Containers/Payment/Success'
import PaymentError from '../src/Containers/Payment/Error'

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

  if (type === 'unfinish') {
    let params = {
      style: 'main user user-success',
      header: {
        title: 'Pembayaran pending'
      }
    }
    return (
      <DynamicNavBarLayout {...params} {...props}>
        <PaymentPending {...props} />
      </DynamicNavBarLayout>
    )
  }
  if (type === 'error') {
    let params = {
      style: 'main user user-success',
      header: {
        title: 'Pembayaran Gagal'
      }
    }
    return (
      <DynamicNavBarLayout {...params} {...props}>
        <PaymentError {...props} />
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
