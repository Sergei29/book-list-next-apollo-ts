import { UserType } from '../types'

/**
 * @description formats user object to have `id` property
 * @param {Object} objUser user object received from DB
 * @returns {Object} formatted user object
 */
export const funcFormatUser = (objUser: UserType) => {
  return { ...objUser }
}
