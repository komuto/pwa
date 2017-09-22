// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
// component
import {Images} from '../src/Themes'
import { NotificationPage } from '../src/Components/Notification'
const Index = () => {
  return (
    <NotificationPage
      icon={Images.regSuccess}
      title='Review Berhasil Dikirim'
      subTitle='Terimakasih telah mengirim review. Review Anda sangat berharga bagi kami untuk meningkatkan layanan.'
      path='/transaction'
      text='Kembali Ke Kehalaman Transaksi' />
  )
}

export default ReduxPageWrapper(Index)
