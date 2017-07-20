// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Reviews from '../src/Containers/Report'

const params = {
  style: 'main user bg-white',
  header: {
    title: 'Laporkan Barang'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Laporkan Barang'
  }
}

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <Reviews query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
