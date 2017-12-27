// set locale
export default (active = 'ID') => {
  let localizeIndex = ['ID', 'EN'].indexOf(active)
  let index = localizeIndex < 0 ? 0 : localizeIndex
  return {
    // home
    'home': ['Beranda', 'Home'][index],
    'search_placeholder': ['Cari barang ', 'Search product or store'][index],
    'product_category': ['Kategori Produk', 'Category Product'][index],
    'product_category_all': ['Lihat semua kategori', 'See all category'][index],
    'product_new': ['Produk Terbaru', 'New Product'][index],
    'product_new_all': ['Lihat semua produk terbaru', 'See all new product'][index],
    'category': ['Kategori', 'Category'][index],
    // notification
    'notification': ['Notifikasi', 'Notification'][index],
    // transaction
    'transaction': ['Transaksi', 'Transaction'][index],
    // profile
    'profile': ['Profil', 'Profile'][index],
    'signin': ['Masuk', 'Sign In'][index],
    'signin_hero_path': ['Daftar Disini', 'Register Here'][index],
    'signin_hero_info': ['Belum punya akun ?', 'No account yet?'][index],
    'signin_info': ['Masuk ke Akun Anda untuk mempermudah proses pembelian', 'Sign in to your Account to make purchasing easier'][index],
    'signin_sub_info': ['Terimakasih', 'Thank you'][index],
    'signin_warning': ['Anda harus masuk terlebih dahulu', 'You must be login'][index],
    'signup': ['Daftar', 'Register'][index],
    'signup_hero_path': ['Masuk Disini', 'Login Here'][index],
    'signup_hero_info': ['Sudah punya akun?', 'Do you have account?'][index],
    'or': ['Atau', 'Or'][index],
    'lost_password': ['Lupa Password?', 'Lost Your Password?'][index],
    'login_facebook': ['Masuk dengan Facebook', 'Login with Facebook'][index],
    // shopping cart
    'shopping_cart': ['Keranjang belanja', 'Shopping cart'][index],
    'delete': ['Hapus', 'Delete'][index],
    'price_piece': ['Harga Satuan', 'Price Pieces'][index],
    'amount': ['Jumlah', 'Amount'][index],
    'delivery': ['Detail Pengiriman', 'Delivery services'][index],
    'sub_total': ['Subtotal', 'Subtotal'][index],
    'have_voucher_code': ['Punya Kode Voucher?', 'Got Promo Code?'][index],
    'use_voucher_code': ['Gunakan Kode Voucher', 'Use Promo Code?'][index],
    'total_payment': ['Total Pembayaran', 'Total Payment'][index],
    'input_voucher_code': ['Masukan Kode Voucher', 'Input Promo Code'][index],
    'idr': ['RP ', 'IDR'][index]

  }
}
