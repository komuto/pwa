// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddressInfo from '../src/Containers/AddressInfo'

const params = {
  style: 'main seller',
  header: {
    title: 'Info Alamat'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Info Alamat'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <AddressInfo query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
