// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DiscussionNew from '../src/Containers/DiscussionNew'

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

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <DiscussionNew query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
