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
  const { localize } = props
  const params = {
    style: 'main no-padding-bottom bg-white',
    header: {
      title: localize.notification
    },
    navbar: {
      searchBoox: false,
      textPath: localize.notification
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
