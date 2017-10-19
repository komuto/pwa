// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductPhotoManage from '../src/Containers/Product/PhotoManage'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Kelola Photo'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Kelola Photo'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductPhotoManage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
