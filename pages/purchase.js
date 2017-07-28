// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Purchase from '../src/Containers/Purchase'

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

const Index = (props) => {
  return (
    <DefaultLayout params={params}>
      <Purchase query={props.query} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
