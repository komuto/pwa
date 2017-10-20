// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import EditRekening from '../src/Containers/Rekening/Edit'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <EditRekening {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
