// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SalesDetail from '../src/Containers/SalesDetail'

const Index = (props) => {
  const params = {
    style: 'main detail bg-grey',
    header: {
      title: 'Detail Penjualan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/sales-list'),
      textPath: 'Detail Penjualan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <SalesDetail {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
