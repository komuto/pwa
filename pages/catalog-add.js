// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddEditCatalog from '../src/Containers/Catalog/AddEdit'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Tambah Katalog'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Tambah Katalog'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <AddEditCatalog {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
