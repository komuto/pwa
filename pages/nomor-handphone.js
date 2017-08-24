// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import NomorHandphone from '../src/Containers/NomorHandphone'

const params = {
  style: 'main user user-success',
  header: {
    title: 'Nomor Handphone'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Nomor Handphone'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <NomorHandphone />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
