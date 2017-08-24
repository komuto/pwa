// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SettingNotification from '../src/Containers/SettingNotification'

const params = {
  style: 'main user',
  header: {
    title: 'Pengaturan Notifikasi'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Pengaturan Notifikasi'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <SettingNotification />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
