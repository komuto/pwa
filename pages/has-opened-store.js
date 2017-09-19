// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import HasOpenedStore from '../src/Containers/HasOpenedStore'

const Index = (props) => {
  const params = {
    style: 'main user user-success',
    header: {
      title: 'Berhasil Membuka Toko'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <HasOpenedStore {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
