// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Discussion from '../src/Containers/Discussion/Discussion'
import DiscussionNew from '../src/Containers/Discussion/New'
import DiscussionDetail from '../src/Containers/Discussion/Detail'

const Index = (props) => {
  const { type } = props.query
  if (type === 'new') {
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
  } else if (type === 'detail') {
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
  } else {
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
}

export default ReduxPageWrapper(Index)
