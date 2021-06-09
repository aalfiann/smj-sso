'use strict'

/**
 * Generate random string
 * @param {integer} length
 * @returns {string}
 */
function randomString (length) {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * Determine value is empty
 * @param {*} value
 * @return {bool}
 */
function isEmptyString (value) {
  return (value === undefined || value === null || value === '')
}

module.exports = {
  randomString,
  isEmptyString
}
