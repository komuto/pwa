// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ResolutionAdd from '../src/Containers/Resolution/Add'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Kirim Keluhan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Kirim Keluhan',
      callBack: () => Router.push('/resolution-center')
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ResolutionAdd />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
