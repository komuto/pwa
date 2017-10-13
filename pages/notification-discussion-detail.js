/** includes layout */
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes container */
import DiscussionDetail from '../src/Containers/Notification/DiscussionDetail'

const Index = (props) => {
  const params = {
    style: 'main user bg-white',
    header: {
      title: 'Detail Diskusi'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <DiscussionDetail {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
