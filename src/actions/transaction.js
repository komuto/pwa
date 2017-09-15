import { buildAction, typeReq } from '../config'

export const LIST_TRANSACTIONS = 'LIST_TRANSACTIONS'
export const GET_TRANSACTION = 'GET_TRANSACTION'
export const GET_BUYER_INVOICE_DETAIL = 'GET_BUYER_INVOICE_DETAIL'
export const ADD_COMPLAINT = 'ADD_COMPLAINT'
export const GET_NEW_ORDERS = 'GET_NEW_ORDERS'
export const GET_NEW_ORDER_DETAIL = 'GET_NEW_ORDER_DETAIL'
export const GET_PROCESSING_ORDERS = 'GET_PROCESSING_ORDERS'
export const GET_PROCESSING_ORDER_DETAIL = 'GET_PROCESSING_ORDER_DETAIL'
export const ACCEPT_ORDER = 'ACCEPT_ORDER'
export const REJECT_ORDER = 'REJECT_ORDER'
export const INPUT_AIRWAY_BILL = 'INPUT_AIRWAY_BILL'
export const GET_COMPLAINED_ORDERS_BUYER = 'GET_COMPLAINED_ORDERS_BUYER'
export const GET_COMPLAINED_ORDERS_SELLER = 'GET_COMPLAINED_ORDERS_SELLER'
export const GET_COMPLAINED_ORDER_DETAIL_BUYER = 'GET_COMPLAINED_ORDER_DETAIL_BUYER'
export const GET_COMPLAINED_ORDER_DETAIL_SELLER = 'GET_COMPLAINED_ORDER_DETAIL_SELLER'
export const CREATE_COMPLAINT_DISCUSSION_BUYER = 'CREATE_COMPLAINT_DISCUSSION_BUYER'
export const CREATE_COMPLAINT_DISCUSSION_SELLER = 'CREATE_COMPLAINT_DISCUSSION_SELLER'
export const UPDATE_AIRWAY_BILL = 'UPDATE_AIRWAY_BILL'

/**
 * @state listTransactions
 */
export const listTransactions = () => buildAction(typeReq(LIST_TRANSACTIONS))

/**
 * @params id {int} transaction id
 * @state transaction
 */
export const getTransaction = params => buildAction(typeReq(GET_TRANSACTION), params)

/**
 * @params id {int} transaction id
 * @params invoiceId {int}
 * @state buyerInvoiceDetail
 */
export const getBuyerInvoiceDetail = params => buildAction(typeReq(GET_BUYER_INVOICE_DETAIL), params)

/**
 * @params id {int} transaction id
 * @params invoiceId {int}
 * @params params are the same as the api
 * @state addComplaint
 */
export const addComplaint = params => buildAction(typeReq(ADD_COMPLAINT), params)

/**
 * @state newOrders
 */
export const getNewOrders = () => buildAction(typeReq(GET_NEW_ORDERS))

/**
 * @params id {int} invoice id
 * @state newOrderDetail
 */
export const getNewOrderDetail = params => buildAction(typeReq(GET_NEW_ORDER_DETAIL), params)

/**
 * @state processingOrders
 */
export const getProcessingOrders = () => buildAction(typeReq(GET_PROCESSING_ORDERS))

/**
 * @params id {int} invoice id
 * @state processingOrderDetail
 */
export const getProcessingOrderDetail = params => buildAction(typeReq(GET_PROCESSING_ORDER_DETAIL), params)

/**
 * @params id {int} invoice id
 * @state updateStatus
 */
export const acceptOrder = params => buildAction(typeReq(ACCEPT_ORDER), params)

/**
 * @params id {int} invoice id
 * @state updateStatus
 */
export const rejectOrder = params => buildAction(typeReq(REJECT_ORDER), params)

/**
 * @params id {int} invoice id
 * @params params are the same as the api
 * @state updateStatus
 */
export const inputAirwayBill = params => buildAction(typeReq(INPUT_AIRWAY_BILL), params)

/**
 * @params params are the same as the api query
 * @state buyerComplainedOrders
 */
export const getComplainedOrdersBuyer = params => buildAction(typeReq(GET_COMPLAINED_ORDERS_BUYER), params)

/**
 * @params params are the same as the api
 * @state sellerComplainedOrders
 */
export const getComplainedOrdersSeller = params => buildAction(typeReq(GET_COMPLAINED_ORDERS_SELLER), params)

/**
 * @params id {int} dispute id
 * @state buyerComplainedOrderDetail
 */
export const getComplainedOrderDetailBuyer = params => buildAction(typeReq(GET_COMPLAINED_ORDER_DETAIL_BUYER), params)

/**
 * @params id {int} dispute id
 * @state sellerComplainedOrderDetail
 */
export const getComplainedOrderDetailSeller = params => buildAction(typeReq(GET_COMPLAINED_ORDER_DETAIL_SELLER), params)

/**
 * @params id {int} dispute id
 * @params params are the same as the api
 * @state buyerComplaintDiscussion
 */
export const createComplaintDiscussionBuyer = params => buildAction(typeReq(CREATE_COMPLAINT_DISCUSSION_BUYER), params)

/**
 * @params id {int} dispute id
 * @params params are the same as the api
 * @state sellerComplaintDiscussion
 */
export const createComplaintDiscussionSeller = params => buildAction(typeReq(CREATE_COMPLAINT_DISCUSSION_SELLER), params)

/**
 * @params id {int} dispute id
 * @params params are the same as the api
 * @state updateStatus
 */
export const updateAirwayBill = params => buildAction(typeReq(UPDATE_AIRWAY_BILL), params)
