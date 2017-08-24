// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddAddress from '../src/Containers/AddAddress'

const params = {
  style: 'main detail edit-data bg-grey',
  header: {
    title: 'Tambah Alamat'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Tambah Alamat'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <AddAddress />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
