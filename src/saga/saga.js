import * as userActions from '../actions/user'
import * as homeActions from '../actions/home'
import * as brandActions from '../actions/brand'
import * as expeditionActions from '../actions/expedition'
import * as locationActions from '../actions/location'
import * as productActions from '../actions/product'
import * as reviewActions from '../actions/review'
import * as storeActions from '../actions/stores'
import * as addressActions from '../actions/address'
import * as bankActions from '../actions/bank'
import * as catalogActions from '../actions/catalog'
import * as cartActions from '../actions/cart'
import * as paymentActions from '../actions/payment'
import * as transactionActions from '../actions/transaction'
import * as messageActions from '../actions/message'
import * as otherActions from '../actions/other'
import * as saldoActions from '../actions/saldo'
import * as userSaga from './user'
import * as homeSaga from './home'
import * as brandSaga from './brand'
import * as expeditionSaga from './expedition'
import * as locationSaga from './location'
import * as productSaga from './product'
import * as reviewSaga from './review'
import * as storeSaga from './stores'
import * as addressSaga from './address'
import * as bankSaga from './bank'
import * as catalogSaga from './catalog'
import * as cartSaga from './cart'
import * as paymentSaga from './payment'
import * as transactionSaga from './transaction'
import * as messageSaga from './message'
import * as otherSaga from './other'
import * as saldoSaga from './saldo'
import { takeEvery, takeLatest } from 'redux-saga/effects'
import { typeReq } from '../config'

function * dataSaga () {
  yield * user()
  yield * home()
  yield * product()
  yield * store()
  yield * address()
  yield * bank()
  yield * brand()
  yield * catalog()
  yield * cart()
  yield * expedition()
  yield * location()
  yield * payment()
  yield * review()
  yield * transaction()
  yield * message()
  yield * other()
  yield * saldo()
}

const user = function * () {
  yield takeEvery(typeReq(userActions.USER_REGISTER), userSaga.register)
  yield takeEvery(typeReq(userActions.USER_VERIFICATION), userSaga.verify)
  yield takeEvery(typeReq(userActions.USER_LOGIN), userSaga.login)
  yield takeEvery(typeReq(userActions.USER_LOGOUT), userSaga.logout)
  yield takeEvery(typeReq(userActions.VALIDATE_TOKEN_FORGET_PASSWORD), userSaga.validateToken)
  yield takeEvery(typeReq(userActions.GET_PROFILE), userSaga.getProfile)
  yield takeEvery(typeReq(userActions.GET_PROFILE_MANAGE), userSaga.getProfileManage)
  yield takeEvery(typeReq(userActions.UPDATE_PROFILE), userSaga.updateProfile)
  yield takeEvery(typeReq(userActions.FORGET_PASSWORD), userSaga.forgetPassword)
  yield takeEvery(typeReq(userActions.LOGIN_SOCIAL), userSaga.loginSocial)
  yield takeEvery(typeReq(userActions.USER_NEW_PASSWORD), userSaga.newPassword)
  yield takeEvery(typeReq(userActions.CHANGE_PASSWORD), userSaga.changePassword)
  yield takeEvery(typeReq(userActions.FAVORITE_STORE), userSaga.favoriteStore)
  yield takeEvery(typeReq(userActions.USER_BALANCE), userSaga.getBalance)
  yield takeEvery(typeReq(userActions.GET_PHONE), userSaga.getPhone)
  yield takeEvery(typeReq(userActions.UPDATE_PHONE), userSaga.updatePhone)
  yield takeEvery(typeReq(userActions.GET_USER_DISCUSSION), userSaga.getDiscussion)
  yield takeEvery(typeReq(userActions.LIST_FAVORIT_STORE), userSaga.listFavoriteStore)
  yield takeEvery(typeReq(userActions.SEND_PHONE_OTP), userSaga.sendOTPPhone)
  yield takeEvery(typeReq(userActions.VERIFIY_PHONE), userSaga.verifyPhone)
  yield takeEvery(typeReq(userActions.SEND_BANK_OTP), userSaga.sendOTPBank)
  yield takeEvery(typeReq(userActions.GET_WISHLIST), userSaga.wishlist)
  yield takeEvery(typeReq(userActions.UPDATE_FIREBASE_REG_TOKEN), userSaga.updateFirebaseToken)
  yield takeEvery(typeReq(userActions.GET_NOTIF_SETTINGS), userSaga.getNotifSettings)
  yield takeEvery(typeReq(userActions.UPDATE_NOTIF_SETTINGS), userSaga.updateNotifSettings)
  yield takeEvery(typeReq(userActions.GET_RESOLVED_RESOLUTIONS), userSaga.getResolvedResolutions)
  yield takeEvery(typeReq(userActions.GET_UNRESOLVED_RESOLUTIONS), userSaga.getUnresolvedResolutions)
  yield takeEvery(typeReq(userActions.GET_RESOLUTION_DETAIL), userSaga.getResolutionDetail)
  yield takeEvery(typeReq(userActions.CREATE_RESOLUTION), userSaga.createResolution)
  yield takeEvery(typeReq(userActions.REPLY_RESOLUTION), userSaga.replyResolution)
  yield takeEvery(typeReq(userActions.RESEND_SIGNUP), userSaga.resendSignup)
  yield takeEvery(typeReq(userActions.UNREAD_DISPUTES), userSaga.getUnreadDisputes)
}

const home = function * () {
  yield takeLatest(typeReq(homeActions.HOME_PRODUCT), homeSaga.product)
  yield takeLatest(typeReq(homeActions.SEARCH_PRODUCT), homeSaga.search)
  yield takeLatest(typeReq(homeActions.FILTER_PRODUCT), homeSaga.filterProduct)
  yield takeEvery(typeReq(homeActions.ALL_CATEGORY), homeSaga.allCategory)
  yield takeEvery(typeReq(homeActions.GET_CATEGORIES_1), homeSaga.categoryList)
  yield takeEvery(typeReq(homeActions.GET_CATEGORIES_2), homeSaga.subCategory)
  yield takeEvery(typeReq(homeActions.GET_CATEGORIES_3), homeSaga.subCategory2)
  yield takeEvery(typeReq(homeActions.GET_CATEGORIES_4), homeSaga.subCategory3)
}

const product = function * () {
  yield takeEvery(typeReq(productActions.GET_PRODUCT), productSaga.getProduct)
  yield takeLatest(typeReq(productActions.LIST_PRODUCT_BY_CATEGORY), productSaga.productByCategory)
  yield takeLatest(typeReq(productActions.LIST_PRODUCT_BY_SEARCH), productSaga.productBySearch)
  yield takeEvery(typeReq(productActions.ADD_TO_WISHLIST), productSaga.addToWishlist)
  yield takeEvery(typeReq(productActions.ADD_TO_WISHLIST_HOME), productSaga.addToWishlistHome)
  yield takeEvery(typeReq(productActions.GET_DISCUSSION), productSaga.getDiscussion)
  yield takeEvery(typeReq(productActions.NEW_DISCUSSION), productSaga.newDiscussion)
  yield takeEvery(typeReq(productActions.GET_COMMENT), productSaga.getComment)
  yield takeEvery(typeReq(productActions.NEW_COMMENT), productSaga.newComment)
  yield takeEvery(typeReq(productActions.REPORT_PRODUCT), productSaga.reportProduct)
  yield takeEvery(typeReq(productActions.CREATE_PRODUCT), productSaga.createProduct)
  yield takeEvery(typeReq(productActions.HIDE_PRODUCTS), productSaga.hideProducts)
  yield takeEvery(typeReq(productActions.DELETE_PRODUCTS), productSaga.deleteProducts)
  yield takeEvery(typeReq(productActions.CHANGE_CATALOG), productSaga.changeCatalogProducts)
  yield takeEvery(typeReq(productActions.UPDATE_PRODUCT), productSaga.updateProduct)
  yield takeEvery(typeReq(productActions.GET_PRODUCT_EXPEDITIONS), productSaga.getProductExpeditions)
  yield takeEvery(typeReq(productActions.ADD_DROPSHIP_PRODUCTS), productSaga.addDropshipProducts)
  yield takeLatest(typeReq(productActions.GET_DROPSHIP_PRODUCTS), productSaga.getDropshipProducts)
  yield takeEvery(typeReq(productActions.UPDATE_DROPSHIP_STATUS), productSaga.updateDropshipStatus)
  yield takeEvery(typeReq(productActions.GET_DROPSHIP_PRODUCT_FOR_ADD), productSaga.getDropshipProductForAdd)
  yield takeEvery(typeReq(productActions.GET_DROPSHIP_PRODUCT_FOR_MANAGE), productSaga.getDropshipProductForManage)
  yield takeEvery(typeReq(productActions.DELETE_DROPSHIP), productSaga.deleteDropship)
}

const store = function * () {
  yield takeEvery(typeReq(storeActions.GET_STORE), storeSaga.getStores)
  yield takeEvery(typeReq(storeActions.CREATE_STORE), storeSaga.createStore)
  yield takeEvery(typeReq(storeActions.PHOTO_UPLOAD), storeSaga.photoUpload)
  yield takeEvery(typeReq(storeActions.STORE_EXPEDITION_LIST), storeSaga.storeExpeditionList)
  yield takeEvery(typeReq(storeActions.VERIFY_STORE), storeSaga.verifyStore)
  yield takeEvery(typeReq(storeActions.MESSAGE_STORE), storeSaga.sendMessageStore)
  yield takeEvery(typeReq(storeActions.STORE_EXPEDITION_MANAGE), storeSaga.storeExpeditionManage)
  yield takeEvery(typeReq(storeActions.GET_OWN_STORE), storeSaga.getOwnStore)
  yield takeEvery(typeReq(storeActions.GET_STORE_PRODUCTS), storeSaga.getStoreProducts)
  yield takeEvery(typeReq(storeActions.GET_STORE_PRODUCT_DETAIL), storeSaga.getStoreProductDetail)
  yield takeEvery(typeReq(storeActions.GET_STORE_CATALOG_PRODUCTS), storeSaga.getStoreCatalogProducts)
  yield takeEvery(typeReq(storeActions.UPDATE_INFORMATION), storeSaga.updateInformation)
  yield takeEvery(typeReq(storeActions.UPDATE_TERM), storeSaga.updateTerm)
  yield takeEvery(typeReq(storeActions.GET_ADDRESS), storeSaga.getStoreAddress)
  yield takeEvery(typeReq(storeActions.UPDATE_STORE_ADDRESS), storeSaga.updateStoreAddress)
  yield takeEvery(typeReq(storeActions.GET_HIDDEN_STORE_PRODUCTS), storeSaga.getHiddenStoreProducts)
  yield takeEvery(typeReq(storeActions.GET_STORE_DISCUSSIONS), storeSaga.getStoreDiscussions)
  yield takeEvery(typeReq(storeActions.GET_STORE_PRODUCTS_BY_CATALOG), storeSaga.getStoreProductsByCatalog)
  yield takeEvery(typeReq(storeActions.UNREAD_DISPUTES_STORE), storeSaga.getUnreadDisputesStore)
  yield takeLatest(typeReq(storeActions.GET_STORE_PRODUCTS_BY_CATALOG_SEARCH), storeSaga.getStoreProductsByCatalogSearch)
  yield takeEvery(typeReq(storeActions.GET_DROPSHIPPER_FAQ), storeSaga.getDropshipFaq)
}

const address = function * () {
  yield takeEvery(typeReq(addressActions.ADD_ADDRESS), addressSaga.addAddress)
  yield takeEvery(typeReq(addressActions.UPDATE_ADDRESS), addressSaga.updateAddress)
  yield takeEvery(typeReq(addressActions.DELETE_ADDRESS), addressSaga.deleteAddress)
  yield takeEvery(typeReq(addressActions.GET_ADDRESS_DETAIL), addressSaga.getAddressDetail)
  yield takeEvery(typeReq(addressActions.GET_LIST_ADDRESS), addressSaga.getListAddress)
  yield takeEvery(typeReq(addressActions.GET_PRIMARY_ADDRESS), addressSaga.getPrimaryAddress)
}

const bank = function * () {
  yield takeEvery(typeReq(bankActions.LIST_BANK), bankSaga.listBank)
  yield takeEvery(typeReq(bankActions.GET_BANK), bankSaga.getBank)
  yield takeEvery(typeReq(bankActions.ADD_BANK_ACCOUNT), bankSaga.addBankAccount)
  yield takeEvery(typeReq(bankActions.GET_BANK_ACCOUNTS), bankSaga.getBankAccounts)
  yield takeEvery(typeReq(bankActions.UPDATE_BANK_ACCOUNT), bankSaga.updateBankAccount)
  yield takeEvery(typeReq(bankActions.DELETE_BANK_ACCOUNT), bankSaga.deleteBankAccount)
  yield takeEvery(typeReq(bankActions.GET_KOMUTO_BANK_ACCOUNTS), bankSaga.getKomutoBankAccounts)
  yield takeEvery(typeReq(bankActions.GET_BANK_ACCOUNT_DETAIL), bankSaga.getBankAccountDetail)
}

const brand = function * () {
  yield takeEvery(typeReq(brandActions.GET_BRAND), brandSaga.getBrand)
  yield takeEvery(typeReq(brandActions.BRAND_BY_CATEGORY), brandSaga.getBrandByCategory)
}

const catalog = function * () {
  yield takeEvery(typeReq(catalogActions.CREATE_CATALOG), catalogSaga.createCatalog)
  yield takeEvery(typeReq(catalogActions.GET_CATALOG), catalogSaga.getCatalog)
  yield takeEvery(typeReq(catalogActions.GET_LIST_CATALOG), catalogSaga.getListCatalog)
  yield takeEvery(typeReq(catalogActions.UPDATE_CATALOG), catalogSaga.updateCatalog)
  yield takeEvery(typeReq(catalogActions.DELETE_CATALOG), catalogSaga.deleteCatalog)
}

const cart = function * () {
  yield takeEvery(typeReq(cartActions.ADD_TO_CART), cartSaga.addToCart)
  yield takeEvery(typeReq(cartActions.GET_PROMO), cartSaga.getPromo)
  yield takeEvery(typeReq(cartActions.COUNT_CART), cartSaga.countCart)
  yield takeEvery(typeReq(cartActions.GET_CART), cartSaga.getCart)
  yield takeEvery(typeReq(cartActions.CANCEL_PROMO), cartSaga.cancelPromo)
  yield takeEvery(typeReq(cartActions.CHECKOUT), cartSaga.checkout)
  yield takeEvery(typeReq(cartActions.DELETE_ITEM), cartSaga.deleteItem)
  yield takeEvery(typeReq(cartActions.GET_ITEM), cartSaga.getItem)
  yield takeEvery(typeReq(cartActions.UPDATE_CART), cartSaga.updateCart)
}

const expedition = function * () {
  yield takeEvery(typeReq(expeditionActions.GET_EXPEDITION), expeditionSaga.getExpedition)
  yield takeEvery(typeReq(expeditionActions.GET_EXPEDITION_SERVICES), expeditionSaga.getServices)
  yield takeEvery(typeReq(expeditionActions.ESTIMATED_SHIPPING), expeditionSaga.estimatedCharge)
  yield takeEvery(typeReq(expeditionActions.GET_SHIPPING_CHARGE), expeditionSaga.getShippingCharge)
  yield takeEvery(typeReq(expeditionActions.UPDATE_EXPEDITION), expeditionSaga.updateExpedition)
  yield takeEvery(typeReq(expeditionActions.GET_STORE_EXPEDITIONS), expeditionSaga.getStoreExpeditions)
  yield takeEvery(typeReq(expeditionActions.MANAGE_STORE_EXPEDITIONS), expeditionSaga.manageStoreExpeditions)
}

const location = function * () {
  yield takeEvery(typeReq(locationActions.GET_PROVINCE), locationSaga.getProvince)
  yield takeEvery(typeReq(locationActions.GET_DISTRICT), locationSaga.getDistrict)
  yield takeEvery(typeReq(locationActions.GET_SUBDISTRICT), locationSaga.getSubDistrict)
  yield takeEvery(typeReq(locationActions.GET_VILLAGE), locationSaga.getVillage)
}

const message = function * () {
  yield takeEvery(typeReq(messageActions.GET_BUYER_MESSAGES), messageSaga.getBuyerMessages)
  yield takeEvery(typeReq(messageActions.GET_SELLER_MESSAGES), messageSaga.getSellerMessages)
  yield takeEvery(typeReq(messageActions.GET_BUYER_DETAIL_MESSAGE), messageSaga.getBuyerDetailMessage)
  yield takeEvery(typeReq(messageActions.GET_SELLER_DETAIL_MESSAGE), messageSaga.getSellerDetailMessage)
  yield takeEvery(typeReq(messageActions.GET_ARCHIVE_BUYER_MESSAGES), messageSaga.getArchiveBuyerMessages)
  yield takeEvery(typeReq(messageActions.GET_ARCHIVE_SELLER_MESSAGES), messageSaga.getArchiveSellerMessages)
  yield takeEvery(typeReq(messageActions.UPDATE_BUYER_MESSAGE), messageSaga.updateBuyerMessage)
  yield takeEvery(typeReq(messageActions.UPDATE_SELLER_MESSAGE), messageSaga.updateSellerMessage)
  yield takeEvery(typeReq(messageActions.BUYER_REPLY_MESSAGE), messageSaga.buyerReplyMessage)
  yield takeEvery(typeReq(messageActions.SELLER_REPLY_MESSAGE), messageSaga.sellerReplyMessage)
  yield takeEvery(typeReq(messageActions.BUYER_DELETE_MESSAGE), messageSaga.buyerDeleteMessage)
  yield takeEvery(typeReq(messageActions.SELLER_DELETE_MESSAGE), messageSaga.sellerDeleteMessage)
  yield takeEvery(typeReq(messageActions.MESSAGE_BUYER), messageSaga.messageBuyer)
  yield takeEvery(typeReq(messageActions.MESSAGE_SELLER), messageSaga.messageSeller)
  yield takeEvery(typeReq(messageActions.MESSAGE_RESELLER), messageSaga.messageReseller)
}

const other = function * () {
  yield takeEvery(typeReq(otherActions.GET_COMMISSION), otherSaga.getCommission)
  yield takeEvery(typeReq(otherActions.GET_SALE_COUNT), otherSaga.getSaleCount)
}

const payment = function * () {
  yield takeEvery(typeReq(paymentActions.GET_PAYMENT_METHODS), paymentSaga.getPaymentMethods)
  yield takeEvery(typeReq(paymentActions.CONFIRM_TRANSFER), paymentSaga.confirmTransfer)
  yield takeEvery(typeReq(paymentActions.GET_MIDTRANS_TOKEN), paymentSaga.getMidtransToken)
  yield takeEvery(typeReq(paymentActions.GET_MIDTRANS_TOKEN_2), paymentSaga.getMidtransToken2)
  yield takeEvery(typeReq(paymentActions.BALANCE_PAYMENT), paymentSaga.balancePayment)
}

const review = function * () {
  yield takeEvery(typeReq(reviewActions.GET_REVIEWS), reviewSaga.getReviews)
  yield takeEvery(typeReq(reviewActions.ADD_REVIEWS), reviewSaga.addReviews)
  yield takeEvery(typeReq(reviewActions.GET_BUYER_REVIEW), reviewSaga.getBuyerReview)
  yield takeEvery(typeReq(reviewActions.GET_SELLER_REVIEW), reviewSaga.getSellerReview)
}

const saldo = function * () {
  yield takeEvery(typeReq(saldoActions.GET_SALDO_TOKEN), saldoSaga.getSaldoToken)
  yield takeEvery(typeReq(saldoActions.GET_SALDO_HISTORY), saldoSaga.getSaldoHistory)
  yield takeEvery(typeReq(saldoActions.WITHDRAW), saldoSaga.withdraw)
  yield takeEvery(typeReq(saldoActions.GET_NOMINALS), saldoSaga.getNominals)
  yield takeEvery(typeReq(saldoActions.GET_TOPUP_STATUS), saldoSaga.getTopupStatus)
  yield takeEvery(typeReq(saldoActions.GET_WITHDRAW_STATUS), saldoSaga.getWithdrawStatus)
  yield takeEvery(typeReq(saldoActions.GET_SALDO_HISTORY_DETAIL), saldoSaga.getSaldoHistoryDetail)
}

const transaction = function * () {
  yield takeEvery(typeReq(transactionActions.LIST_TRANSACTIONS), transactionSaga.listTransactions)
  yield takeEvery(typeReq(transactionActions.GET_TRANSACTION), transactionSaga.getTransaction)
  yield takeEvery(typeReq(transactionActions.GET_BUYER_INVOICE_DETAIL), transactionSaga.getBuyerInvoiceDetail)
  yield takeEvery(typeReq(transactionActions.ADD_COMPLAINT), transactionSaga.addComplaint)
  yield takeEvery(typeReq(transactionActions.GET_NEW_ORDERS), transactionSaga.getNewOrders)
  yield takeEvery(typeReq(transactionActions.GET_NEW_ORDER_DETAIL), transactionSaga.getNewOrderDetail)
  yield takeEvery(typeReq(transactionActions.GET_PROCESSING_ORDERS), transactionSaga.getProcessingOrders)
  yield takeEvery(typeReq(transactionActions.GET_PROCESSING_ORDER_DETAIL), transactionSaga.getProcessingOrderDetail)
  yield takeEvery(typeReq(transactionActions.ACCEPT_ORDER), transactionSaga.acceptOrder)
  yield takeEvery(typeReq(transactionActions.REJECT_ORDER), transactionSaga.rejectOrder)
  yield takeEvery(typeReq(transactionActions.INPUT_AIRWAY_BILL), transactionSaga.inputAirwayBill)
  yield takeEvery(typeReq(transactionActions.GET_COMPLAINED_ORDERS_BUYER), transactionSaga.getComplainedOrdersBuyer)
  yield takeEvery(typeReq(transactionActions.GET_COMPLAINED_ORDERS_SELLER), transactionSaga.getComplainedOrdersSeller)
  yield takeEvery(typeReq(transactionActions.GET_COMPLAINED_ORDER_DETAIL_BUYER), transactionSaga.getComplainedOrderDetailBuyer)
  yield takeEvery(typeReq(transactionActions.GET_COMPLAINED_ORDER_DETAIL_SELLER), transactionSaga.getComplainedOrderDetailSeller)
  yield takeEvery(typeReq(transactionActions.CREATE_COMPLAINT_DISCUSSION_BUYER), transactionSaga.createComplaintDiscussionBuyer)
  yield takeEvery(typeReq(transactionActions.CREATE_COMPLAINT_DISCUSSION_SELLER), transactionSaga.createComplaintDiscussionSeller)
  yield takeEvery(typeReq(transactionActions.UPDATE_AIRWAY_BILL), transactionSaga.updateAirwayBill)
  yield takeEvery(typeReq(transactionActions.BUYER_DISPUTE_RECEIVED), transactionSaga.buyerDisputeReceived)
  yield takeEvery(typeReq(transactionActions.SELLER_DISPUTE_RECEIVED), transactionSaga.sellerDisputeReceived)
  yield takeEvery(typeReq(transactionActions.GET_SALES), transactionSaga.getSales)
  yield takeEvery(typeReq(transactionActions.GET_SALE_DETAIL), transactionSaga.getSaleDetail)
  yield takeEvery(typeReq(transactionActions.GET_COMPLAINED_ORDERS_BUYER_2), transactionSaga.getComplainedOrdersBuyer2)
  yield takeEvery(typeReq(transactionActions.GET_COMPLAINED_ORDERS_SELLER_2), transactionSaga.getComplainedOrdersSeller2)
  yield takeEvery(typeReq(transactionActions.GET_SALES_2), transactionSaga.getSales2)
  yield takeEvery(typeReq(transactionActions.BUYER_REFUND), transactionSaga.buyerRefund)
}

export default dataSaga
