import Router from 'next/router'
/** includes layout */
import DefaultLayout from '../src/Layout/DefaultLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes container */
import Message from '../src/Containers/Notification/Message'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-white',
    header: {
      title: 'Pesan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-store'),
      textPath: 'Pesan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Message {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
