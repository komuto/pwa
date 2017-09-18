// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddressData from '../src/Containers/AddressData'

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
      <AddressData {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
