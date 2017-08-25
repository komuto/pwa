// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DataRekening from '../src/Containers/DataRekening'

const params = {
  style: 'main detail edit-data bg-grey',
  header: {
    title: 'Data Rekening'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Data Rekening'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <DataRekening />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
