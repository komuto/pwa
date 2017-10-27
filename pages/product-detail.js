// @flow
// layout
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ProductDetail from '../src/Containers/Product/Detail'
import generateId from '../src/Lib/GenerateId'

const Index = (props) => {
  let { query } = props
  if (!query.id) {
    query.id = generateId(props.query)
  }

  const params = {
    style: 'categories detail bg-grey',
    header: {
      title: 'Produk Detail'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Produk Detail'
    }
  }
  return (
    <DynamicNavBarLayout {...params} {...props}>
      <ProductDetail {...props} />
    </DynamicNavBarLayout>
  )
}

export default ReduxPageWrapper(Index)
