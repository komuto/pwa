// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddressStore from '../src/Containers/Address/Store'

const Index = (props) => {
  const params = {
    style: 'main detail edit-data',
    header: {
      title: 'Info Alamat'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/store-setting'),
      textPath: 'Info Alamat'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <AddressStore {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
