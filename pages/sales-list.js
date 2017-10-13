// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SalesList from '../src/Containers/SalesList'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Daftar Penjualan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/sales'),
      textPath: 'Daftar Penjualan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <SalesList {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
