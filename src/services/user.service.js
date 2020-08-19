import { getAdminPageCheck } from './api.service'

export const setUpPasswordV1 = (jwtToken, csrfToken, url) => {
    return getAdminPageCheck(jwtToken, csrfToken, url)
  }