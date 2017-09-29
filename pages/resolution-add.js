// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import ResolutionAdd from '../src/Containers/ResolutionAdd'

const Index = (props) => {
  const params = {
    style: 'main seller',
    header: {
      title: 'Kirim Keluhan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Kirim Keluhan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <ResolutionAdd />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
