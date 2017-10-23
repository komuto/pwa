// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SignUp from '../src/Containers/Account/SignUp'
import SignUpVerification from '../src/Containers/Account/SignUpVerification'

const Index = (props) => {
  const { localize, query } = props
  const { type } = query
  if (type === 'verification') {
    const params = {
      style: 'user',
      header: {
        title: 'Verifikasi'
      },
      navbar: {
        searchBoox: false,
        textPath: 'Verifikasi'
      }
    }
    return (
      <DefaultLayout {...params} {...props}>
        <SignUpVerification {...props} />
      </DefaultLayout>
    )
  } else {
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
        textPath: localize.signup_hero_path,
        textInfo: localize.signup_hero_info
      }
    }
    return (
      <DefaultLayout {...params} {...props}>
        <SignUp {...props} />
      </DefaultLayout>
    )
  }
}

export default ReduxPageWrapper(Index)
