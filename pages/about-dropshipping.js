// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AboutDropshipping from '../src/Containers/AboutDropshipping'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Tentang Dropshipping'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Tentang Dropshipping'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <AboutDropshipping {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
