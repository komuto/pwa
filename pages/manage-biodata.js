// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageBiodata from '../src/Containers/Manage/Biodata'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Kelola Akun'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-account', '/manage/account'),
      textPath: 'Kelola Akun'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ManageBiodata {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
