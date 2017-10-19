// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SendMessageShipment from '../src/Containers/SendMessage/Shipment'

const Index = (props) => {
  const params = {
    style: 'main user bg-white',
    header: {
      title: 'Kirim Pesan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Kirim Pesan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <SendMessageShipment {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
