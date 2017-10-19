// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageStore from '../src/Containers/Manage/Store'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey',
    header: {
      title: 'Toko Anda'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/profile'),
      textPath: 'Toko Anda'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ManageStore {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
