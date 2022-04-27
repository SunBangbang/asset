/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPhone(str) {
  const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
  return phoneReg.test(str.trim())
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLoginPwd(str) {
  return str.length>=6
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function checkSocialCreditCode(code) {
   const creditCodeReg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
    return creditCodeReg.test(code)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function checkIDCard(idcode) {
   const IDCardReg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return IDCardReg.test(idcode)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function checkEmail(email) {
   const EmailReg = /^[a-zA-Z0-9.!#$%&"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
    return EmailReg.test(email)
}
