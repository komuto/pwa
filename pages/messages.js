// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Messages from '../src/Containers/Message/Messages'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-white',
    header: {
      title: 'Pesan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/notification'),
      textPath: 'Pesan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Messages {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
