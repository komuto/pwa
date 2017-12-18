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
        callBack: () => Router.push('/profile'),
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
        title: 'Pembayaran Telah Berhasil',
        subTitle: 'Terimakasih telah melakukan topup saldo',
        path: '/balance?type=topup&status=history',
        alias: '/balance/topup/history',
        text: 'Lihat balance status'
      }
      return <DefaultLayout> <NotificationPage {...params} /> </DefaultLayout>
    }

    /** status topup balance unfinish */
    if (status === 'unfinish') {
      let params = {
        icon: Images.phoneAccount,
        title: 'Pembayaran Gagal',
        subTitle: 'Maaf, anda gagal melakukan topup saldo',
        path: '/balance?type=topup',
        alias: '/balance/topup',
        text: 'Lihat balance status'
      }
      return <DefaultLayout> <NotificationPage {...params} /> </DefaultLayout>
    }

    /** status topup balance error */
    if (status === 'error') {
      let params = {
        icon: Images.phoneAccount,
        title: 'Pembayaran gagal',
        subTitle: 'Terjadi kesalahan saat pembayaran saldo',
        path: '/balance?type=topup',
        alias: '/balance/topup',
        text: 'Lihat balance status'
      }
      return <DefaultLayout><NotificationPage {...params} /></DefaultLayout>
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
        title: 'Penarikan saldo berhasil',
        subTitle: 'Terimakasih telah melakukan penarikan saldo',
        path: '/balance-withdraw-status',
        text: 'Lihat balance status'
      }
      return <DefaultLayout><NotificationPage {...params} /></DefaultLayout>
    }

    /** status withdraw balance unfinish */
    if (status === 'unfinish') {
      let params = {
        icon: Images.phoneAccount,
        title: 'Penarikan saldo gagal',
        subTitle: 'Maaf, anda gagal melakukan penarikan saldo',
        path: '/balance-withdraw-status',
        text: 'Lihat balance status'
      }
      return <DefaultLayout><NotificationPage {...params} /></DefaultLayout>
    }

    /** status withdraw balance error */
    if (status === 'error') {
      let params = {
        icon: Images.phoneAccount,
        title: 'Penarikan saldo gagal',
        subTitle: 'Terjadi kesalahan saat penarikan saldo',
        path: '/balance-withdraw-status',
        text: 'Lihat balance status'
      }
      return <DefaultLayout><NotificationPage {...params} /></DefaultLayout>
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
          title: 'Riwayat Saldo'
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
