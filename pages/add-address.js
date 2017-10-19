// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddressAdd from '../src/Containers/Address/Add'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <AddressAdd />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
