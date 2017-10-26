// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// container
import Home from '../src/Containers/Home'

const Index = (props) => {
  return <Home {...props} />
}

export default ReduxPageWrapper(Index)
