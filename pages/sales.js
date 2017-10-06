// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Sales from '../src/Containers/Sales'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey',
    header: {
      title: 'Penjualan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Penjualan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Sales {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
