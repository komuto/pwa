// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddRekening from '../src/Containers/AddRekening'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <AddRekening {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
