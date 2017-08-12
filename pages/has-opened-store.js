// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import HasOpenedStore from '../src/Containers/HasOpenedStore'
// utils
// import {PROFILE} from '../src/Utils/Constant'

const params = {
  style: 'main user user-success',
  header: {
    title: 'Berhasil Membuka Toko'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <HasOpenedStore />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
