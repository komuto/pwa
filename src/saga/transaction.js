import * as apis from '../api/transaction'
import * as actions from '../actions/transaction'
import { buildSaga, getState } from '../config'

export const listTransactions = buildSaga(apis.listTransactions, actions.LIST_TRANSACTIONS)
export const getTransaction = buildSaga(apis.getTransaction, actions.GET_TRANSACTION,
  getState({ from: (state) => state.listTransactions.listTransactions, match: ['bucket', 'id'] }))
export const getBuyerInvoiceDetail = buildSaga(apis.getBuyerInvoiceDetail, actions.GET_BUYER_INVOICE_DETAIL)
export const addComplaint = buildSaga(apis.addComplaint, actions.ADD_COMPLAINT)
export const getNewOrders = buildSaga(apis.getNewOrders, actions.GET_NEW_ORDERS)
export const getNewOrderDetail = buildSaga(apis.getNewOrderDetail, actions.GET_NEW_ORDER_DETAIL)
export const getProcessingOrders = buildSaga(apis.getProcessingOrders, actions.GET_PROCESSING_ORDERS)
export const getProcessingOrderDetail = buildSaga(apis.getProcessingOrderDetail, actions.GET_PROCESSING_ORDER_DETAIL)
export const acceptOrder = buildSaga(apis.acceptOrder, actions.ACCEPT_ORDER)
export const rejectOrder = buildSaga(apis.rejectOrder, actions.REJECT_ORDER)
export const inputAirwayBill = buildSaga(apis.inputAirwayBill, actions.INPUT_AIRWAY_BILL)
export const getComplainedOrdersBuyer = buildSaga(apis.getComplainedOrdersBuyer, actions.GET_COMPLAINED_ORDERS_BUYER)
export const getComplainedOrdersSeller = buildSaga(apis.getComplainedOrdersSeller, actions.GET_COMPLAINED_ORDERS_SELLER)
export const getComplainedOrderDetailBuyer = buildSaga(apis.getComplainedOrderDetailBuyer, actions.GET_COMPLAINED_ORDER_DETAIL_BUYER)
export const getComplainedOrderDetailSeller = buildSaga(apis.getComplainedOrderDetailSeller, actions.GET_COMPLAINED_ORDER_DETAIL_SELLER)
export const createComplaintDiscussionBuyer = buildSaga(apis.createComplaintDiscussionBuyer, actions.CREATE_COMPLAINT_DISCUSSION_BUYER)
export const createComplaintDiscussionSeller = buildSaga(apis.createComplaintDiscussionSeller, actions.CREATE_COMPLAINT_DISCUSSION_SELLER)
export const updateAirwayBill = buildSaga(apis.updateAirwayBill, actions.UPDATE_AIRWAY_BILL)
