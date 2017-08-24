// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageAccount from '../src/Containers/ManageAccount'

const params = {
  style: 'main detail edit-data bg-grey',
  header: {
    title: 'Kelola Akun'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Kelola Akun'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <ManageAccount />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
