import Cookies from 'js-cookie'

const userInfoKey = 'userType'
const userNameKey='userName'

export function getToken() {
  return Cookies.get(userInfoKey)
}

export function getName() {
  return Cookies.get(userNameKey)
}

export function setToken(data) {
  return Cookies.set(userInfoKey, data)
}

export function setName(data) {
  return Cookies.set(userNameKey, data)
}

export function removeToken() {
  return Cookies.remove(userInfoKey)
}

export function removeName() {
  return Cookies.remove(userNameKey)
}
