// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import EditAddress from '../src/Containers/EditAddress'

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

const Index = (props) => (
  <DefaultLayout params={params}>
    <EditAddress query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
