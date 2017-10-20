// /** includes dependecies */
// import Router from 'next/router'
// /** includes layout */
// import DefaultLayout from '../src/Layout/DefaultLayout'
// /** includes wrapper */
// import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// /** includes containers */
// import Topup from '../src/Containers/Balance/Topup'
// /** includees components */
// import { NotificationPage } from '../src/Components/Notification'
// /** includes themes */
// import Images from '../src/Themes/Images'

// const Index = (props) => {
//   let { type } = props.query

//   /** status topup balance finish */
//   if (type === 'finish') {
//     let params = {
//       icon: Images.phoneSuccess,
//       title: 'Anda berhasil melalukan topup saldo',
//       subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//       path: '/balance-topup-status',
//       text: 'Lihat balance status'
//     }
//     return <NotificationPage {...params} />
//   }

//   /** status topup balance unfinish */
//   if (type === 'unfinish') {
//     let params = {
//       icon: Images.phoneAccount,
//       title: 'Gagal melakukan topup saldo',
//       subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//       path: '/balance-topup-status',
//       text: 'Lihat balance status'
//     }
//     return <NotificationPage {...params} />
//   }

//   /** status topup balance error */
//   if (type === 'error') {
//     let params = {
//       icon: Images.phoneAccount,
//       title: 'Topup saldo error',
//       subTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
//       path: '/balance-topup-status',
//       text: 'Lihat balance status'
//     }
//     return <NotificationPage {...params} />
//   }

//   if (!type) {
//     const params = {
//       style: 'main no-padding-bottom bg-white saldo',
//       header: {
//         title: 'Pilih Nominal Saldo'
//       },
//       navbar: {
//         searchBoox: false,
//         path: '/',
//         callBack: () => Router.push('/balance'),
//         textPath: 'Pilih Nominal Saldo'
//       }
//     }
//     return (
//       <DefaultLayout {...params} {...props}>
//         <Topup {...props} />
//       </DefaultLayout>
//     )
//   }
// }

// export default ReduxPageWrapper(Index)
