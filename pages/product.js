// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories4 from '../src/Containers/Categories4'

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Produk Terbaru'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Produk Terbaru'
  }
}

const Index = (props) => {
  console.log(props)
  return (
    <DefaultLayout params={params}>
      <Categories4 />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
