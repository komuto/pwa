// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import EditAddress from '../src/Containers/Address/Edit'

const Index = (props) => {
  const params = {
    style: 'main detail edit-data bg-grey',
    header: {
      title: 'Edit Alamat'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Edit Alamat'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <EditAddress {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
