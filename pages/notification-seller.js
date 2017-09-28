// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import NotificationSeller from '../src/Containers/NotificationSeller'

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
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <NotificationSeller {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
