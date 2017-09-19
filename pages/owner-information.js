// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import OwnerInformation from '../src/Containers/OwnerInformation'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Info Pemilik'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Info Pemilik'
    }
  }

  return (
    <DefaultLayout {...params} {...props}>
      <OwnerInformation {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
