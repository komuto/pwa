// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ChangePassword from '../src/Containers/ChangePassword'

const Index = (props) => {
  const params = {
    style: 'main user',
    header: {
      title: 'Ganti Password'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-account', '/manage/account'),
      textPath: 'Ganti Password'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ChangePassword {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
