// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import InformationStore from '../src/Containers/InformationStore'
// utils

const params = {
  style: 'main seller',
  header: {
    title: 'Informasi Toko'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Informasi Toko'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <InformationStore query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
