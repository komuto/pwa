// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import EditRekening from '../src/Containers/EditRekening'

const params = {
  style: 'main user',
  header: {
    title: 'Edit Data Rekening'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Edit Data Rekening'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <EditRekening query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
