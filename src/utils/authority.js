// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return window.localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  return window.localStorage.setItem('antd-pro-authority', authority);
}

export function getUserInfo() {
  // return window.localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const result = false;
  try {
    return JSON.parse(window.localStorage.getItem('userInfo'));
  } catch (e) {
    return result;
  }
  
}

export function setUserInfo(info) {
  return window.localStorage.setItem('userInfo', info);
}

export function removeUserInfo(info) {
  return window.localStorage.removeItem('userInfo');
}

export function getToken() {
  // return window.localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return window.localStorage.getItem('token');
}

export function setToken(token) {
  return window.localStorage.setItem('token', token);
}

export function removeToken() {
  return window.localStorage.removeItem('token');
}
