// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DiscussionDetail from '../src/Containers/Discussion/Detail'

const Index = (props) => {
  const params = {
    style: 'main user bg-white is-padding-160',
    header: {
      title: 'Diskusi'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Diskusi'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <DiscussionDetail {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
