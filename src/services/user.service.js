import { getAdminPageCheck } from './api.service'

export const checkAdminRole = (jwtToken, url) => {
    return getAdminPageCheck(jwtToken, url)
  }