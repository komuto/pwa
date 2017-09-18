// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// container
import Home from '../src/Containers/Home'
// config
import Menu from '../src/Config/Menu'

const Index = (props) => {
  const { localize } = props
  const params = {
    style: 'home bg-grey',
    header: {
      title: localize.home
    },
    navbar: {
      searchBoox: true,
      textPath: 'Galaksi Parabola'
    },
    tabbar: {
      active: Menu.HOME,
      isShow: true
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Home {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
