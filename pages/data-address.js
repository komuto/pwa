// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DataAddress from '../src/Containers/DataAddress'

const params = {
  style: 'main no-padding-bottom bg-grey',
  header: {
    title: 'Data Alamat'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Data Alamat'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <DataAddress />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
