// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageAddress from '../src/Containers/Address/Manage'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey',
    header: {
      title: 'Data Alamat'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-account', '/manage/account'),
      textPath: 'Data Alamat'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ManageAddress {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
