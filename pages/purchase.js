// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Purchase from '../src/Containers/Purchase'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Proses Pembelian'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Proses Pembelian'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Purchase {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
