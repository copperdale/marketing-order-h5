import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function getHomePage() {
  return request(`${prefix}MeiYe/public/api/thirdSys/redirect/index?token=${getToken()}`, { method: 'GET' });
}

export async function getReportPage() {
  return request(`${prefix}MeiYe/public/api/thirdSys/redirect/report?token=${getToken()}`, { method: 'GET' });
}

export async function getMarketingPage() {
  return request(`${prefix}MeiYe/public/api/thirdSys/redirect/marketing?token=${getToken()}`, { method: 'GET' });
}

export async function getCustomerPage() {
  return request(`${prefix}MeiYe/public/api/thirdSys/redirect/customer?token=${getToken()}`, { method: 'GET' });
}

export async function getCommercialSettingPage() {
  return request(`${prefix}MeiYe/public/api/thirdSys/redirect/commercialSetting?token=${getToken()}`, { method: 'GET' });
}

export async function getCustomerSettingPage() {
  return request(`${prefix}MeiYe/public/api/thirdSys/redirect/customerSetting?token=${getToken()}`, { method: 'GET' });
}

