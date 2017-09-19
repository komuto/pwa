// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import NomorHandphone from '../src/Containers/NomorHandphone'

const Index = (props) => {
  const params = {
    style: 'main user user-success',
    header: {
      title: 'Nomor Handphone'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      callBack: () => Router.push('/manage-account'),
      textPath: 'Nomor Handphone'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <NomorHandphone {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
