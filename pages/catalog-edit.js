// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddEditCatalog from '../src/Containers/AddEditCatalog'

const params = {
  style: 'main user',
  header: {
    title: 'Edit Katalog'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Edit Katalog'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <AddEditCatalog query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
