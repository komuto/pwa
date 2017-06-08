// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import About from '../src/Containers/About'
// style custom

const Index = () => (
  <DefaultLayout>
    <About />
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
