// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddEditNoHandphone from '../src/Containers/AddEditNoHandphone'

const params = {
  style: 'main user',
  header: {
    title: 'Ubah Nomor Handphone'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Ubah Nomor Handphone'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <AddEditNoHandphone />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
