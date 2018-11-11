import store from '../index.js';

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
    // debugger;
    if (!window.localStorage.getItem('userInfo')) {
      removeToken();
      removeUserInfo();
      store.dispatch(routerRedux.push({
        pathname: '/user/login',
        search: stringify({
          redirect: window.location.href,
        }),
      }));
      return;
    }
    return JSON.parse(window.localStorage.getItem('userInfo'));
  } catch (e) {
    // store.dispatch({
    //   type: 'login/logout',
    // });
    removeToken();
    removeUserInfo();
    window.open(location.href.split('#')[0] + '#/user/login', '_self');
  }
  
}

export function setUserInfo(info) {
  return window.localStorage.setItem('userInfo', info);
}

export function removeUserInfo() {
  return window.localStorage.removeItem('userInfo');
}

export function getToken() {
  // return window.localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return window.localStorage.getItem('token');
}

function getAuthorities() {
  const authorities = getUserInfo().user.authorities || [];
  if (!authorities) {
    return [];
  }

  return authorities.map(item => item.authority);
}

export function hasAuthrity(authorityCode = '') {
  return getAuthorities().some(item => item === authorityCode);
}

export function setToken(token) {
  return window.localStorage.setItem('token', token);
}

export function removeToken() {
  return window.localStorage.removeItem('token');
}
