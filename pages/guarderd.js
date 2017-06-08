// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import About from '../src/Containers/About'
import GuardContainer from '../src/Containers/GuardContainer'
// style custom

const Index = () => (
  <DefaultLayout>
    <GuardContainer>
      <About />
    </GuardContainer>
  </DefaultLayout>
)

export default ReduxPageWrapper(Index)
