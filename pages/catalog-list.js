// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import CatalogList from '../src/Containers/Catalog/List'

const Index = (props) => {
  const params = {
    style: 'main detail edit-data',
    header: {
      title: 'Katalog'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/store-setting'),
      textPath: 'Katalog'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <CatalogList {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
