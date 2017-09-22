// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import CatalogAddProduct from '../src/Containers/CatalogAddProduct'

const Index = (props) => {
  const params = {
    style: 'main seller bg-grey',
    header: {
      title: 'Tempatkan di Katalog'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/dropship'),
      textPath: 'Tempatkan di Katalog'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <CatalogAddProduct {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
