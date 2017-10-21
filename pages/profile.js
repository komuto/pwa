// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Profile from '../src/Containers/Account/Profile'
// utils
import Menu from '../src/Config/Menu'

const Index = (props) => {
  const { localize } = props
  const params = {
    style: 'main user bg-grey',
    header: {
      title: localize.profile
    },
    navbar: {
      searchBoox: false,
      textPath: localize.profile
    },
    tabbar: {
      active: Menu.PROFILE,
      isShow: true
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Profile {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
