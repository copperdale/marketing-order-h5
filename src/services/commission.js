// import { stringify } from 'qs';
import request from '../utils/request';
import { prefix } from './URL';
import { getToken } from '../utils/authority';

export async function queryPlan(params) {
    params.pageNum = 0;
    params.pageSize = 100000;

    // parameter spell issue
    if (params.planType) {
        params.planPype = params.planType;
        // delete params.planType;
    }
    Object.keys(params).forEach((key) => {
        params[key] = params[key].trim ? params[key].trim() : params[key];
    });
    return request(`${prefix}MeiYe/public/api/talentPlan/getTalentPage?token=${getToken()}`, {
        method: 'POST',
        body: params,
    });
}

export async function newCommission(params) {
    return request(`${prefix}MeiYe/public/api/talentPlan/save?token=${getToken()}`, {
        method: 'POST',
        body: params,
    });
}

export async function updateCommission(params) {
    return request(`${prefix}MeiYe/public/api/talentPlan/update?token=${getToken()}`, {
        method: 'POST',
        body: params,
    });
}

export async function deleteCommission(id) {
    return request(`${prefix}MeiYe/public/api/talentPlan/delete/${id}?token=${getToken()}`, {
        method: 'GET',
    });
}

export async function getCommission(id) {
    return request(`${prefix}MeiYe/public/api/talentPlan/find/${id}?token=${getToken()}`, {
        method: 'GET',
    });
}

export async function setCommissionStatus({ id, status }) {
    return request(`${prefix}MeiYe/public/api/talentPlan/status/${id}/${status}?token=${getToken()}`, {
        method: 'GET',
    });
}



