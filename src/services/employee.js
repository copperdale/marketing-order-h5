// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function getEmployeeRoles() {
    return request(`${prefix}MeiYe/public/api/role/authRole/findAll?token=${getToken()}`, { method: 'GET' });
}

// /public/api/part/dishShop/getDishShopPageByCriteria
export async function deleteEmployeeRoles(id) {
    return request(`${prefix}MeiYe/public/api/role/authRole/delete/${id}?token=${getToken()}`, { method: 'GET' });
}

export async function addEmployeeRole(param) {
    return request(`${prefix}MeiYe/public/api/role/authRole/save?token=${getToken()}`, {
        method: 'POST',
        body: param,
    });
}

export async function updateEmployeeRole(param) {
    return request(`${prefix}MeiYe/public/api/role/authRole/update?token=${getToken()}`, {
        method: 'POST',
        body: param,
    });
}

export async function getAllPermission() {
    return request(`${prefix}MeiYe/public/api/role/authPermission/findAll?token=${getToken()}`, { method: 'GET' });
}

export async function getEmployees(params) {
    params.pageNum = 0; // eslint-disable-line
    params.pageSize = 100000; // eslint-disable-line
    return request(`${prefix}MeiYe/public/api/role/authUser/getUserPage?token=${getToken()}`, { 
        method: 'POST',
        body: params,
    });
}

export async function deleteEmployee(id) {
    return request(`${prefix}MeiYe/public/api/role/authUser/delete/${id}`, {
        method: 'GET',
    });
}