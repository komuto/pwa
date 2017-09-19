// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import PasswordReset from '../src/Containers/PasswordReset'

const Index = (props) => {
  const params = {
    style: 'user',
    header: {
      title: 'Lupa Password'
    },
    navbar: {
      searchBoox: false,
      path: '/signin',
      textPath: 'Lupa Password'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <PasswordReset {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
