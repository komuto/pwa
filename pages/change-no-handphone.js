// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddEditNoHandphone from '../src/Containers/AddEditNoHandphone'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <AddEditNoHandphone {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
