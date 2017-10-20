// /** includes dependecies */
// import Router from 'next/router'
// /** includes layout */
// import DefaultLayout from '../src/Layout/DefaultLayout'
// /** includes wrapper */
// import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// /** includes container */
// import TopupStatus from '../src/Containers/Balance/TopupStatus'

// const Index = (props) => {
//   const params = {
//     style: 'main no-padding-bottom bg-white saldo',
//     header: {
//       title: 'Status Pengisian Saldo'
//     },
//     navbar: {
//       searchBoox: false,
//       path: '/',
//       callBack: () => Router.push('/balance'),
//       textPath: 'Status Pengisian Saldo'
//     }
//   }
//   return (
//     <DefaultLayout {...params} {...props}>
//       <TopupStatus {...props} />
//     </DefaultLayout>
//   )
// }

// export default ReduxPageWrapper(Index)
