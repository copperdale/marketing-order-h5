import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL.js';

export async function login(params) {
  // eslint-disable-next-line
  // params = {"userName":"admin",
  //   "password":"123456",
  //   "storeId":"1",
  //   "verifyCode":"ab1255",
  // }
  console.log(params);
  return request(`${prefix}MeiYe/login?${stringify(params)}`, {
    method: 'POST',
    body: {},
  });
}

export async function getVerifyCode() {
  // eslint-disable-next-line
  return request(`${prefix}MeiYe/verifyCode/get?timestamp=${(new Date()).getTime()}`);
}

export async function fakeRegister(params) {
  
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
