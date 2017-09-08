// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageBiodata from '../src/Containers/ManageBiodata'

const toManageAccount = () => {
  Router.push('/manage-account')
}

const params = {
  style: 'main user',
  header: {
    title: 'Kelola Akun'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toManageAccount(),
    textPath: 'Kelola Akun'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ManageBiodata query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
