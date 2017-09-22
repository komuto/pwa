import { authApiKomuto } from './api'
import { buildQuery } from '../config'

export const listTransactions = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`transactions?${query}`)
}

export const getTransaction = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`transactions/${id}`)
}

export const getBuyerInvoiceDetail = ({ id, invoiceId }) => {
  const axios = authApiKomuto()
  return axios.get(`transactions/${id}/invoices/${invoiceId}`)
}

export const addComplaint = ({ id, invoiceId, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`transactions/${id}/invoices/${invoiceId}/dispute`, data)
}

export const getNewOrders = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`new-orders?${query}`)
}

export const getNewOrderDetail = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`invoices/${id}/new-order-detail`)
}

export const getProcessingOrders = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`processing-orders?${query}`)
}

export const getProcessingOrderDetail = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`invoices/${id}/processing-order-detail`)
}

export const acceptOrder = ({ id }) => {
  const axios = authApiKomuto()
  return axios.put(`invoices/${id}/accept`, {})
}

export const rejectOrder = ({ id }) => {
  const axios = authApiKomuto()
  return axios.put(`invoices/${id}/reject`, {})
}

export const inputAirwayBill = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.put(`invoices/${id}/airway-bill`, data)
}

export const getComplainedOrdersBuyer = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/disputes?${query}`)
}

export const getComplainedOrdersSeller = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`users/store/disputes?${query}`)
}

export const getComplainedOrderDetailBuyer = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/disputes/${id}`)
}

export const getComplainedOrderDetailSeller = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`users/store/disputes/${id}`)
}

export const createComplaintDiscussionBuyer = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`users/disputes/${id}/discussions`, data)
}

export const createComplaintDiscussionSeller = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.post(`users/store/disputes/${id}/discussions`, data)
}

export const updateAirwayBill = ({ id, ...data }) => {
  const axios = authApiKomuto()
  return axios.put(`users/store/disputes/${id}/airway-bill`, data)
}

export const buyerDisputeReceived = ({ id, data }) => {
  const axios = authApiKomuto()
  return axios.post(`users/disputes/${id}/received`, data)
}

export const sellerDisputeReceived = ({ id }) => {
  const axios = authApiKomuto()
  return axios.put(`users/store/disputes/${id}/received`)
}

export const getSales = (data) => {
  const axios = authApiKomuto()
  const query = buildQuery(data)
  return axios.get(`sales/?${query}`)
}

export const getSaleDetail = ({ id }) => {
  const axios = authApiKomuto()
  return axios.get(`invoices/${id}/sale-detail`)
}
