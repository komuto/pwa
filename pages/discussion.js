// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Discussion from '../src/Containers/Discussion/Discussion'

const Index = (props) => {
  const params = {
    style: 'main user bg-grey is-padding-160',
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
      <Discussion {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
