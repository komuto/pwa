export const Status = {
  SUCCESS: 200,
  FAILED: 400,
  UNAUTHORIZED: 401,
  BAD_GATEWAY: 502,
  OFFLINE: 'EOFFLINE',
  TIMEOUT: 'ETIMEOUT',
  UNKNOWN: 'EUNKNOWN'
}

export const validateResponse = (params, errorMessage) => {
  switch (params.status) {
    case Status.SUCCESS:
      return isFound(params.isFound, errorMessage)
    case Status.FAILED:
    case Status.UNAUTHORIZED:
    case Status.BAD_GATEWAY:
    case Status.OFFLINE:
    case Status.TIMEOUT:
    case Status.UNKNOWN:
      return isError(true, params.message)
    default:
      return isError(false)
  }
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

export const isFound = (status, errorMessage = null) => {
  return {type: 'is-danger', status: !status, message: errorMessage}
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
  } else {
    return false
  }
}
