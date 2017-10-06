// @flow
// layout
import DefaultLayout from '../src/Layout/DefaultLayout'
// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// containers
import SendMessage from '../src/Containers/SendMessage'

const Index = (props) => {
  const params = {
    style: 'main user bg-white',
    header: {
      title: 'Kirim Pesan'
    },
    navbar: {
      searchBoox: false,
      path: '/',
      textPath: 'Kirim Pesan'
    }
  }
  return (
    <DefaultLayout {...params} {...props}>
      <SendMessage {...props} />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
