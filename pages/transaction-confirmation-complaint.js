// wrapper
import ReduxPageWrapper from '../src/Utils/ReduxPageWrapper'
import DefaultLayout from '../src/Layout/DefaultLayout'
// component
import {Images} from '../src/Themes'
import { NotificationPage } from '../src/Components/Notification'
const Index = () => {
  return (
    <DefaultLayout>
      <NotificationPage
        icon={Images.regSuccess}
        title='Komplain Telah Terkirim'
        subTitle='Kami memohon maaf atas ketidaknyamanan yang Anda alami. Komplain Anda telah kami terima. Untuk melihat perkembangan komplain Anda. Anda bisa melihat di menu Notifikasi - Pusat Resolusi'
        path='/transaction'
        text='Kembali Ke Halaman Transaksi' />
    </DefaultLayout>
  )
}

export default ReduxPageWrapper(Index)
