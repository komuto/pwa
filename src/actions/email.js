import { buildAction, typeReq } from '../config'

export const CHECK_EMAIL_VALIDITY = 'CHECK_EMAIL_VALIDITY'

export const checkEmail = params => buildAction(typeReq(CHECK_EMAIL_VALIDITY), params)
