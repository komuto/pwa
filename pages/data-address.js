// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DataAddress from '../src/Containers/Address/DataAddress'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey',
    header: {
      title: 'Data Alamat'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-account'),
      textPath: 'Data Alamat'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <DataAddress {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
