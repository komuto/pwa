// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DiscussionNew from '../src/Containers/Discussion/New'

const Index = (props) => {
  const params = {
    style: 'main user bg-white',
    header: {
      title: 'Diskusi Baru'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Diskusi Baru'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <DiscussionNew {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
