// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import CatalogList from '../src/Containers/CatalogList'

const toStoreSetting = () => {
  Router.push('/store-setting')
}

const params = {
  style: 'main detail edit-data',
  header: {
    title: 'Katalog'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toStoreSetting(),
    textPath: 'Katalog'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <CatalogList query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
