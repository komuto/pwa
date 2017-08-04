// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddInformationStore from '../src/Containers/AddInformationStore'
// utils
import { PROFILE } from '../src/Utils/Constant'

const params = {
  style: 'main seller',
  header: {
    title: 'Isi Informasi Toko'
  },
  navbar: {
    searchBoox: false,
    textPath: 'Isi Informasi Toko'
  },
  tabbar: {
    active: PROFILE,
    isShow: true
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <AddInformationStore />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
