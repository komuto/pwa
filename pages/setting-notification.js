// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SettingNotification from '../src/Containers/SettingNotification'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Pengaturan Notifikasi'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-account', '/manage/account'),
      textPath: 'Pengaturan Notifikasi'
    }
  }

  return (
    <DefaultLayout {...params} {...props}>
      <SettingNotification {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
