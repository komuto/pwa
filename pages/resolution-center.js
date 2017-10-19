// @flow
import Router from 'next/router'
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ResolutionCenter from '../src/Containers/Resolution/Center'

const Index = (props) => {
  const params = {
    style: 'main detail resolusi bg-grey',
    header: {
      title: 'Pusat Resolusi'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Pusat Resolusi',
      callBack: () => Router.push('/notification')
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ResolutionCenter {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
