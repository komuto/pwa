// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import Discussion from '../src/Containers/Notification/Discussion'

const Index = (props) => {
  const params = {
    style: 'main user bg-white',
    header: {
      title: 'Diskusi Produk'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-store'),
      textPath: 'Diskusi Produk'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <Discussion {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
