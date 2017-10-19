// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import MessageDetail from '../src/Containers/Message/Detail'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-white',
    header: {
      title: 'Pesan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <MessageDetail {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
