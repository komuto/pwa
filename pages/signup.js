// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SignUp from '../src/Containers/SignUp'

const Index = (props) => {
  const { localize } = props
  const params = {
    style: 'user',
    header: {
      title: localize.signup
    },
    navbar: {
      searchBoox: false,
      path: '/profile',
      textPath: localize.signup
    },
    hero: {
      path: '/signin',
      textPath: localize.signup_hero,
      textInfo: localize.signup_hero_info
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <SignUp {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
