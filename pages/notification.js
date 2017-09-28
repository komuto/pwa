// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Notification from '../src/Containers/Notification'
// utils
import Menu from '../src/Config/Menu'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-white',
    header: {
      title: 'Notifikasi'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Notifikasi'
    },
    tabbar: {
      active: Menu.NOTIFICATION,
      isShow: true
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Notification {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
