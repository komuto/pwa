// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Reviews from '../src/Containers/Report'

const Index = (props) => {
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
  return (
    <DefaultLayout {...params} {...props}>
      <Reviews {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
