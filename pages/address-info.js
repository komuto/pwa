// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddressInfo from '../src/Containers/AddressInfo'
// utils
// import { PROFILE } from '../src/Utils/Constant'

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

const Index = () => (
  <DefaultLayout params={params}>
    <AddressInfo />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
