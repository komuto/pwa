/** includes layout */
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes container */
import MessageDetail from '../src/Containers/Notification/MessageDetail'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-white',
    header: {
      title: 'Detail Pesan'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <MessageDetail {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
