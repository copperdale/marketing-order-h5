// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function getProductList() {
    return request(`${prefix}MeiYe/public/api/part/loadBrandTypes?token=${getToken()}`, { method: 'GET' });
}

export async function deleteProduct(id) {
    return request(`${prefix}MeiYe/public/api/part/deleteBrandType/${id}?token=${getToken()}`, { method: 'GET' });
}

export async function addProductType({ id, name, typeCode }) {
    return request(`${prefix}MeiYe/public/api/part/saveBrandType?token=${getToken()}`, {
        method: 'POST',
        body: { parentId: id, name, typeCode },
    });
}

export async function editProductType({ id, name, typeCode }) {
    return request(`${prefix}MeiYe/public/api/part/updateBrandType?token=${getToken()}`, {
        method: 'POST',
        body: { id, name, typeCode },
    });
}

export async function queryProductTypes({ name, dishCode, type }) {
    return request(`${prefix}MeiYe/public/api/part/dishShop/getDishShopPageByCriteria?token=${getToken()}`, {
        method: 'POST',
        body: {
            'pageNum':0,
            'pageSize':1000000,
            name: name.trim(),
            dishCode: dishCode.trim(),
            type: type.trim(),
        },
    });
}

export async function deleteDishShop(id) {
    return request(`${prefix}MeiYe/public/api/part/dishShop/delete/3/${id}?token=${getToken()}`, { method: 'GET' });
}
// /public/api/part/dishShop/getDishShopPageByCriteria
