// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductAddStepOne from '../src/Containers/ProductAddStepOne'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Upload Photo'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Upload Photo'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ProductAddStepOne {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
