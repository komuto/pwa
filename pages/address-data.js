// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddressData from '../src/Containers/AddressData'

const toStoreSetting = () => {
  Router.push('/store-setting')
}

const params = {
  style: 'main detail edit-data',
  header: {
    title: 'Info Alamat'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toStoreSetting(),
    textPath: 'Info Alamat'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <AddressData query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
