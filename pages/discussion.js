// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Discussion from '../src/Containers/Discussion'

const params = {
  style: 'main user bg-grey',
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
      <Discussion query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
