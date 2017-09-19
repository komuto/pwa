// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Payment from '../src/Containers/Payment'

const Index = (props) => {
  const params = {
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

export default ReduxPageWrapper(Index)
