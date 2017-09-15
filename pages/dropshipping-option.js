// @flow
// import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DropshippingOption from '../src/Containers/DropshippingOption'

const params = {
  style: 'main user',
  header: {
    title: 'Opsi Dropshipping'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Opsi Dropshipping'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <DropshippingOption query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
