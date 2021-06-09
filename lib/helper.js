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

/**
 * Append new query parameter
 * @param {string} url
 * @param {string} key
 * @param {string} value
 * @returns {string}
 */
function appendUrlParam (url, key, value) {
  url = new URL(url)
  url.searchParams.append(key, value)
  return url.toString()
}

module.exports = {
  randomString,
  isEmptyString,
  appendUrlParam
}
