import { combineReducers } from 'redux'
import * as storage from 'redux-storage'
import * as purchaseReducers from './purchase'
import * as userReducers from './user'
import * as homeReducers from './home'
import * as brandReducers from './brand'
import * as productReducers from './product'
import * as expeditionReducers from './expedition'
import * as locationReducers from './location'
import * as reviewReducers from './review'
import * as storeReducers from './stores'
import * as addressReducers from './address'
import * as bankReducers from './bank'
import * as catalogReducers from './catalog'
import * as cartReducers from './cart'
import * as paymentReducers from './payment'
import * as transactionReducers from './transaction'
import * as messageReducers from './message'
import * as otherReducers from './other'
import * as saldoReducers from './saldo'

const purchase = {
  addressSelected: purchaseReducers.addressSelected,
  shippingInformation: purchaseReducers.shippingInformation,
  courierExpedition: purchaseReducers.courierExpedition,
  amountProduct: purchaseReducers.amountProduct,
  packageExpedition: purchaseReducers.packageExpedition,
  noted: purchaseReducers.noted,
  insurance: purchaseReducers.insurance
}

const user = {
  user: userReducers.auth,
  verification: userReducers.verify,
  validation: userReducers.validateToken,
  newPassword: userReducers.newPassword,
  changePassword: userReducers.changePassword,
  profile: userReducers.getProfile,
  updateProfile: userReducers.updateProfile,
  register: userReducers.register,
  forgetPassword: userReducers.forgetPassword,
  isLogin: userReducers.isLogin,
  balance: userReducers.getBalance,
  favorite: userReducers.favoriteStore,
  phone: userReducers.getPhone,
  updatePhone: userReducers.updatePhone,
  userDiscussion: userReducers.getDiscussion,
  listFavoriteStore: userReducers.listFavoriteStore,
  sendOTPPhone: userReducers.sendOTPPhone,
  verifyPhone: userReducers.verifyPhone,
  sendOTPBank: userReducers.sendOTPBank,
  wishlist: userReducers.wishlist,
  alterUser: userReducers.alterUser,
  notifSettings: userReducers.notifSettings,
  resolvedResolutions: userReducers.getResolvedResolutions,
  unresolvedResolutions: userReducers.getUnresolvedResolutions,
  resolutionDetail: userReducers.getResolutionDetail,
  createResolution: userReducers.createResolution,
  replyResolution: userReducers.replyResolution,
  unreadDisputes: userReducers.unreadDisputes
}

const home = {
  products: homeReducers.product,
  searchProduct: homeReducers.searchProduct,
  filterProduct: homeReducers.filterProduct,
  allCategory: homeReducers.allCategory,
  category: homeReducers.categoryList,
  subCategory: homeReducers.subCategory,
  subCategory2: homeReducers.subCategory2,
  subCategory3: homeReducers.subCategory3
}

const product = {
  productDetail: productReducers.getProduct,
  productByCategory: productReducers.productByCategory,
  productBySearch: productReducers.productBySearch,
  addWishlist: productReducers.addToWishlist,
  addWishlistHome: productReducers.addToWishlistHome,
  discussions: productReducers.getDiscussion,
  newDiscussion: productReducers.newDiscussion,
  comments: productReducers.getComment,
  newComment: productReducers.newComment,
  report: productReducers.reportProduct,
  alterProducts: productReducers.alterProducts,
  productExpeditions: productReducers.getProductExpeditions,
  addDropshipProducts: productReducers.addDropshipProducts,
  tempCreateProduct: productReducers.tempCreateProduct,
  dropshipProducts: productReducers.getDropshipProducts
}

const store = {
  stores: storeReducers.stores,
  upload: storeReducers.photoUpload,
  createStore: storeReducers.createStore,
  expeditionListStore: storeReducers.expeditionListStore,
  expeditionStore: storeReducers.expeditionStore,
  verifyStore: storeReducers.verifyStore,
  sendMessageStore: storeReducers.sendMessageStore,
  ownStore: storeReducers.getOwnStore,
  storeProducts: storeReducers.getStoreProducts,
  storeProductDetail: storeReducers.getStoreProductDetail,
  storeCatalogProducts: storeReducers.getStoreCatalogProducts,
  tempCreateStore: storeReducers.tempCreateStore,
  updateStore: storeReducers.updateStore,
  storeAddress: storeReducers.getStoreAddress,
  updateStoreAddress: storeReducers.updateStoreAddress,
  hiddenStoreProducts: storeReducers.getHiddenStoreProducts,
  storeDiscussions: storeReducers.getStoreDiscussions,
  storeProductsByCatalog: storeReducers.getStoreProductsByCatalog,
  unreadDisputesStore: storeReducers.unreadDisputesStore,
  storeCatalogProductsSearch: storeReducers.getStoreProductsByCatalogSearch,
  dropshipfaq: storeReducers.getDropshipperFaq
}

const address = {
  address: addressReducers.getAddressDetail,
  updateAddress: addressReducers.updateAddress,
  deleteAddress: addressReducers.deleteAddress,
  addAddress: addressReducers.addAddress,
  listAddress: addressReducers.listAddress,
  primaryAddress: addressReducers.primaryAddress
}

const bank = {
  bank: bankReducers.getBank,
  banks: bankReducers.listBank,
  bankAccount: bankReducers.bankAccount,
  listBankAccounts: bankReducers.getBankAccounts,
  bankAccountDetail: bankReducers.getBankAccountDetail,
  komutoAccounts: bankReducers.getKomutoBankAccounts
}

const brand = {
  brands: brandReducers.brand,
  brandsByCategory: brandReducers.brandByCategory
}

const catalog = {
  createCatalog: catalogReducers.createCatalog,
  updateCatalog: catalogReducers.updateCatalog,
  getCatalog: catalogReducers.getDetailCatalog,
  getListCatalog: catalogReducers.getListCatalog,
  deleteCatalog: catalogReducers.deleteCatalog
}

const cart = {
  cart: cartReducers.cart,
  checkout: cartReducers.checkout,
  addToCart: cartReducers.addToCart,
  promo: cartReducers.getPromo,
  cancelPromo: cartReducers.cancelPromo,
  countCart: cartReducers.countCart,
  item: cartReducers.getItem,
  deleteItem: cartReducers.deleteItem,
  updateCart: cartReducers.updateCart
}

const expedition = {
  expeditions: expeditionReducers.expedition,
  expeditionServices: expeditionReducers.expeditionServices,
  estimatedCharges: expeditionReducers.estimatedShipping,
  shippingCharges: expeditionReducers.shippingCharge,
  updateExpedition: expeditionReducers.updateExpediton,
  storeExpeditions: expeditionReducers.getStoreExpeditions,
  manageExpeditions: expeditionReducers.manageStoreExpeditions
}

const location = {
  provinces: locationReducers.province,
  districts: locationReducers.district,
  subdistricts: locationReducers.subdistrict,
  villages: locationReducers.village
}

const message = {
  buyerMessages: messageReducers.getBuyerMessages,
  sellerMessages: messageReducers.getSellerMessages,
  buyerDetailMessage: messageReducers.getBuyerDetailMessage,
  sellerDetailMessage: messageReducers.getSellerDetailMessage,
  archiveBuyerMessages: messageReducers.getArchiveBuyerMessages,
  archiveSellerMessages: messageReducers.getArchiveSellerMessages,
  updateMessage: messageReducers.updateMessage,
  replyMessage: messageReducers.replyMessage,
  deleteMessage: messageReducers.deleteMessage,
  transactionMessage: messageReducers.transactionMessage
}

const other = {
  commission: otherReducers.getCommission,
  saleCount: otherReducers.getSaleCount,
  marketplace: otherReducers.getMarketPlace,
  marketplaceCommission: otherReducers.getMarketPlaceCommission,
  getBanner: otherReducers.getBanner,
  tempMarketplace: otherReducers.setMarketPlaceTemp
}

const payment = {
  paymentMethods: paymentReducers.getPaymentMethods,
  confirmation: paymentReducers.confirmTransfer,
  snapToken: paymentReducers.getMidtransToken,
  snapToken2: paymentReducers.getMidtransToken2
}

const review = {
  productReview: reviewReducers.getReviews,
  addReviews: reviewReducers.addReviews,
  buyerReview: reviewReducers.getBuyerReview,
  sellerReview: reviewReducers.getSellerReview,
  storeReview: reviewReducers.storeReview
}

const saldo = {
  saldoHistory: saldoReducers.getSaldoHistory,
  withdrawal: saldoReducers.withdraw,
  saldoToken: saldoReducers.getSaldoToken,
  nominals: saldoReducers.getNominals,
  topupStatus: saldoReducers.getTopupStatus,
  withdrawStatus: saldoReducers.getWithdrawStatus,
  saldoHistoryDetail: saldoReducers.getSaldoHistoryDetail
}

const transaction = {
  listTransactions: transactionReducers.listTransactions,
  transaction: transactionReducers.getTransaction,
  buyerInvoiceDetail: transactionReducers.getBuyerInvoiceDetail,
  addComplaint: transactionReducers.addComplaint,
  newOrders: transactionReducers.getNewOrders,
  newOrderDetail: transactionReducers.getNewOrderDetail,
  processingOrders: transactionReducers.getProcessingOrders,
  processingOrderDetail: transactionReducers.getProcessingOrderDetail,
  updateStatus: transactionReducers.updateStatus,
  buyerComplainedOrders: transactionReducers.getComplainedOrdersBuyer,
  sellerComplainedOrders: transactionReducers.getComplainedOrdersSeller,
  buyerComplainedOrders2: transactionReducers.getComplainedOrdersBuyer2,
  sellerComplainedOrders2: transactionReducers.getComplainedOrdersSeller2,
  buyerComplainedOrderDetail: transactionReducers.getComplainedOrderDetailBuyer,
  sellerComplainedOrderDetail: transactionReducers.getComplainedOrderDetailSeller,
  buyerComplaintDiscussion: transactionReducers.createComplaintDiscussionBuyer,
  sellerComplaintDiscussion: transactionReducers.createComplaintDiscussionSeller,
  buyerReceived: transactionReducers.buyerDisputeReceived,
  sellerReceived: transactionReducers.sellerDisputeReceived,
  sales: transactionReducers.getSales,
  sales2: transactionReducers.getSales2,
  saleDetail: transactionReducers.getSaleDetail,
  buyerRefund: transactionReducers.buyerRefund
}

const komutoApps = storage.reducer(combineReducers({
  ...user,
  ...home,
  ...product,
  ...store,
  ...address,
  ...bank,
  ...brand,
  ...catalog,
  ...cart,
  ...expedition,
  ...location,
  ...review,
  ...payment,
  ...transaction,
  ...message,
  ...other,
  ...saldo,
  ...purchase
}))

const rootReducer = (state, action) => {
  // console.log('state: ', state);
  // console.log('action: ', action);
  // if (action.type === 'USER_LOGOUT_SUCCESS') {
  //   state = undefined
  // }
  return komutoApps(state, action)
}

export default storage.reducer(rootReducer)
