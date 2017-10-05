/** includes dependecies */
import Router from 'next/router'
/** includes layout */
import DefaultLayout from '../src/Layout/DefaultLayout'
/** includes wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
/** includes containers */
import Withdraw from '../src/Containers/Balance/Withdraw'
/** includees components */
import { NotificationPage } from '../src/Components/Notification'
/** includes themes */
import Images from '../src/Themes/Images'

const Index = (props) => {
  let { type } = props.query

  /** status withdraw balance finish */
  if (type === 'finish') {
    let params = {
      icon: Images.phoneSuccess,
      title: 'Anda berhasil melalukan penarikan saldo',
      subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      path: '/balance-withdraw-status',
      text: 'Lihat balance status'
    }
    return <NotificationPage {...params} />
  }

  /** status withdraw balance unfinish */
  if (type === 'unfinish') {
    let params = {
      icon: Images.phoneAccount,
      title: 'Gagal melakukan penarikan saldo',
      subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      path: '/balance-withdraw-status',
      text: 'Lihat balance status'
    }
    return <NotificationPage {...params} />
  }

  /** status withdraw balance error */
  if (type === 'error') {
    let params = {
      icon: Images.phoneAccount,
      title: 'Penarikan saldo error',
      subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      path: '/balance-withdraw-status',
      text: 'Lihat balance status'
    }
    return <NotificationPage {...params} />
  }

  if (!type) {
    const params = {
      style: 'main no-padding-bottom bg-white saldo',
      header: {
        title: 'Tarik Saldo'
      },
      navbar: {
        searchBoox: false,
        path: '/',
        callBack: () => Router.push('/balance'),
        textPath: 'Tarik Saldo'
      }
    }
    return (
      <DefaultLayout {...params} {...props}>
        <Withdraw {...props} />
      </DefaultLayout>
    )
  }
}

export default ReduxPageWrapper(Index)
