// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import OwnerInformation from '../src/Containers/OwnerInformation'
// utils
// import { PROFILE } from '../src/Utils/Constant'

const params = {
  style: 'main seller',
  header: {
    title: 'Info Pemilik'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Info Pemilik'
  }
}

const Index = () => (
  <DefaultLayout params={params}>
    <OwnerInformation />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
