// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageAccount from '../src/Containers/ManageAccount'

const Index = (props) => {
  const params = {
    style: 'main detail edit-data bg-grey',
    header: {
      title: 'Kelola Akun'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/profile'),
      textPath: 'Kelola Akun'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ManageAccount {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
