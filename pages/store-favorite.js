// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import StoreFavorite from '../src/Containers/Store/Favorite'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-grey',
    header: {
      title: 'Daftar Toko Favorit'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/profile'),
      textPath: 'Daftar Toko Favorit'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <StoreFavorite {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
