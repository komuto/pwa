// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import AddressInfo from '../src/Containers/Address/Info'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Info Alamat'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Info Alamat'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <AddressInfo {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
