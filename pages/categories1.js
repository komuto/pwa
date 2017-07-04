// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Categories1 from '../src/Containers/Categories1'
// style custom

const params = {
  style: 'categories bg-grey',
  header: {
    title: 'Semua Kategori'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    textPath: 'Pilih Kategori'
  }
}

const Index = (props) => {
  console.log(props)
  return (
    <DefaultLayout params={params}>
      <Categories1 />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
