// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DiscussionDetail from '../src/Containers/DiscussionDetail'

const params = {
  style: 'main user bg-white',
  header: {
    title: 'Diskusi'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Diskusi'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <DiscussionDetail query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
