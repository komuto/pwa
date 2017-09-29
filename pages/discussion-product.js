// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import DiscussionProduct from '../src/Containers/DiscussionProduct'

const Index = (props) => {
  const params = {
    style: 'main seller-info bg-white',
    header: {
      title: 'Diskusi Produk'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Diskusi Produk',
      callBack: () => Router.push('/notification')
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <DiscussionProduct {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
