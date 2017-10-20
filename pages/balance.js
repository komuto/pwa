import Router from 'next/router'
import DefaultLayout from '../src/Layout/DefaultLayout'
import DynamicNavBarLayout from '../src/Layout/DynamicNavBarLayout'
/** includees wrapper */
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
import Balance from '../src/Containers/Balance/Balance'
import Topup from '../src/Containers/Balance/Topup'
import TopupStatus from '../src/Containers/Balance/TopupStatus'
import Withdraw from '../src/Containers/Balance/Withdraw'
import WithdrawStatus from '../src/Containers/Balance/WithdrawStatus'
import History from '../src/Containers/Balance/History'
import TransactionDetail from '../src/Containers/Balance/TransactionDetail'
/** includees components */
import { NotificationPage } from '../src/Components/Notification'
/** includes themes */
import Images from '../src/Themes/Images'

const Index = (props) => {
  let { type, status } = props.query
  /** default type */
  if (!type) {
    const params = {
      style: 'main no-padding-bottom bg-grey saldo',
      header: {
        title: 'Saldo'
      },
      navbar: {
        searchBoox: false,
        path: '/',
        textPath: 'Saldo'
      }
    }
    return (
      <DefaultLayout {...params} {...props}>
        <Balance {...props} />
      </DefaultLayout>
    )
  }

  if (type === 'topup') {
    /** status topup balance finish */
    if (status === 'finish') {
      let params = {
        icon: Images.phoneSuccess,
        title: 'Anda berhasil melalukan topup saldo',
        subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        path: '/balance-topup-status',
        text: 'Lihat balance status'
      }
      return <NotificationPage {...params} />
    }

    /** status topup balance unfinish */
    if (status === 'unfinish') {
      let params = {
        icon: Images.phoneAccount,
        title: 'Gagal melakukan topup saldo',
        subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        path: '/balance-topup-status',
        text: 'Lihat balance status'
      }
      return <NotificationPage {...params} />
    }

    /** status topup balance error */
    if (status === 'error') {
      let params = {
        icon: Images.phoneAccount,
        title: 'Topup saldo error',
        subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        path: '/balance-topup-status',
        text: 'Lihat balance status'
      }
      return <NotificationPage {...params} />
    }

    if (status === 'history') {
      const params = {
        style: 'main no-padding-bottom bg-white saldo',
        header: {
          title: 'Status Pengisian Saldo'
        },
        navbar: {
          searchBoox: false,
          path: '/',
          callBack: () => Router.push('/balance'),
          textPath: 'Status Pengisian Saldo'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <TopupStatus {...props} />
        </DefaultLayout>
      )
    }

    if (!status) {
      const params = {
        style: 'main no-padding-bottom bg-white saldo',
        header: {
          title: 'Pilih Nominal Saldo'
        },
        navbar: {
          searchBoox: false,
          path: '/',
          callBack: () => Router.push('/balance'),
          textPath: 'Pilih Nominal Saldo'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <Topup {...props} />
        </DefaultLayout>
      )
    }
  }

  if (type === 'withdraw') {
    /** status withdraw balance finish */
    if (status === 'finish') {
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
    if (status === 'unfinish') {
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
    if (status === 'error') {
      let params = {
        icon: Images.phoneAccount,
        title: 'Penarikan saldo error',
        subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        path: '/balance-withdraw-status',
        text: 'Lihat balance status'
      }
      return <NotificationPage {...params} />
    }

    if (status === 'history') {
      const params = {
        style: 'main no-padding-bottom bg-grey saldo',
        header: {
          title: 'Status Penarikan Saldo'
        },
        navbar: {
          searchBoox: false,
          path: '/',
          callBack: () => Router.push('/balance'),
          textPath: 'Status Penarikan Saldo'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <WithdrawStatus {...props} />
        </DefaultLayout>
      )
    }

    if (!status) {
      let params = {
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

  if (type === 'history') {
    if (status === 'detail') {
      const params = {
        style: 'main no-padding-bottom bg-grey saldo',
        header: {
          title: 'Detail Transaksi'
        },
        navbar: {
          searchBoox: false,
          path: '/',
          callBack: () => Router.push('/balance?type=history', '/balance/history'),
          textPath: 'Detail Transaksi'
        }
      }
      return (
        <DefaultLayout {...params} {...props}>
          <TransactionDetail {...props} />
        </DefaultLayout>
      )
    }
    if (!status) {
      const params = {
        style: 'main no-padding-bottom bg-grey saldo',
        header: {
          title: 'History Saldo'
        }
      }
      return (
        <DynamicNavBarLayout {...params} {...props}>
          <History {...props} />
        </DynamicNavBarLayout>
      )
    }
  }
}

export default ReduxPageWrapper(Index)
