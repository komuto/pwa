// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import StoreSetting from '../src/Containers/StoreSetting'

const Index = (props) => {
  const params = {
    style: 'main no-padding-bottom bg-grey',
    header: {
      title: 'Kelola Toko'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-store'),
      textPath: 'Kelola Toko'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <StoreSetting {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
