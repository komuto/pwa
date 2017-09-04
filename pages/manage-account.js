// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ManageAccount from '../src/Containers/ManageAccount'

const toProfile = () => {
  Router.push('/profile')
}

const params = {
  style: 'main detail edit-data bg-grey',
  header: {
    title: 'Kelola Akun'
  },
  navbar: {
    searchBoox: false,
    path: '/',
    callBack: () => toProfile(),
    textPath: 'Kelola Akun'
  }
}

const Index = (props) => (
  <DefaultLayout params={params}>
    <ManageAccount query={props.query} />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
