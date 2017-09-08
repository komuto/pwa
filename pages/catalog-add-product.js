// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import CatalogAddProduct from '../src/Containers/CatalogAddProduct'

const toDropship = () => {
  Router.push('/dropship')
}

const params = {
  style: 'main seller bg-grey',
  header: {
    title: 'Tempatkan di Katalog'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toDropship(),
    textPath: 'Tempatkan di Katalog'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <CatalogAddProduct query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
