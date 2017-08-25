// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddRekening from '../src/Containers/AddRekening'

const params = {
  style: 'main user',
  header: {
    title: 'Tambah Data Rekening'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Tambah Data Rekening'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <AddRekening />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
