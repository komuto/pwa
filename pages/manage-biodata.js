// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageBiodata from '../src/Containers/ManageBiodata'

const params = {
  style: 'main user',
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
    <ManageBiodata />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
