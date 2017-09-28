export const Status = {
  SUCCESS: 200,
  FAILED: 400,
  UNAUTHORIZED: 401,
  NOT_ACCEPTABLE: 406,
  BAD_GATEWAY: 502,
  OFFLINE: 'EOFFLINE',
  TIMEOUT: 'ETIMEOUT',
  UNKNOWN: 'EUNKNOWN'
}

export const validateResponse = (notification = null, {status, isFound, message}, myMessage) => {
  if (status === Status.SUCCESS && !isFound) {
    return notifError(message)
  } else if (status === Status.FAILED) {
    return notifError(message)
  } else if (status === Status.UNAUTHORIZED) {
    return notifError(message)
  } else if (status === Status.BAD_GATEWAY) {
    return notifError(message)
  } else if (status === Status.OFFLINE) {
    return notifError(message)
  } else if (status === Status.TIMEOUT) {
    return notifError(message)
  } else if (status === Status.UNKNOWN) {
    return notifError(message)
  } else {
    return notif()
  }
}

const notif = () => {
  return { type: '', status: false, message: null }
}

export const validateResponseAlter = (params, okMessage, failMessage) => {
  switch (params.status) {
    case Status.SUCCESS:
      return { type: 'is-success', status: true, message: okMessage }
    case Status.FAILED:
      return { type: 'is-danger', status: true, message: failMessage }
    case Status.UNAUTHORIZED:
    case Status.BAD_GATEWAY:
    case Status.OFFLINE:
    case Status.TIMEOUT:
    case Status.UNKNOWN:
      return {type: 'is-danger', status: true, message: failMessage}
    default:
      break
  }
}

export const isFetching = (params) => {
  return params.isLoading && params.status === 0
}

export const isFound = ({ isFound }) => {
  return isFound
}

export const isError = ({ status, isFound }) => {
  if (status === Status.SUCCESS && !isFound) {
    return true
  } else if (status === Status.FAILED) {
    return true
  } else if (status === Status.UNAUTHORIZED) {
    return true
  } else if (status === Status.BAD_GATEWAY) {
    return true
  } else if (status === Status.OFFLINE) {
    return true
  } else if (status === Status.TIMEOUT) {
    return true
  } else if (status === Status.UNKNOWN) {
    return true
  } else if (status === Status.NOT_ACCEPTABLE) {
    return true
  } else if (isFound) {
    return false
  }
}

export const notifError = (message) => {
  return { type: 'is-danger', status: true, message }
}

export const notifSuccess = (message) => {
  return { type: 'is-success', status: true, message }
}
