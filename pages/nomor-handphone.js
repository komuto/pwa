// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import NomorHandphone from '../src/Containers/NomorHandphone'

const toManageAccount = () => {
  Router.push('/manage-account')
}

const params = {
  style: 'main user user-success',
  header: {
    title: 'Nomor Handphone'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toManageAccount(),
    textPath: 'Nomor Handphone'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <NomorHandphone query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
