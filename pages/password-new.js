// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PasswordNew from '../src/Containers/Password/New'

const Index = (props) => {
  const params = {
    style: 'user login',
    header: {
      title: 'Password Baru'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Password Baru'
    }
  }

  return (
    <DefaultLayout {...params} {...props}>
      <PasswordNew {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
