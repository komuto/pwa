// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SignIn from '../src/Containers/Account/SignIn'

const Index = (props) => {
  const { localize } = props
  const params = {
    style: 'user login',
    header: {
      title: localize.signin
    },
    navbar: {
      searchBoox: false,
      path: '/profile',
      textPath: localize.signin
    },
    hero: {
      path: '/signup',
      textPath: localize.signin_hero_path,
      textInfo: localize.signin_hero_info
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <SignIn {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
