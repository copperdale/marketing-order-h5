// import { parse } from 'qs';
import { notification } from 'antd';
import { 
  getEmployeeRoles, 
  deleteEmployeeRoles, 
  getAllPermission, 
  addEmployeeRole, 
  updateEmployeeRole, 
  getEmployees,
  deleteEmployee,
  updateStatusFlag,
  getEmployeeRole,
} from '../services/employee';

export default {
  namespace: 'employee',

  state: {
    // EmployeeRoleList: [{ "code": "test1111", "id": 1, "name": "店长" }, { "code": "test1111", "id": 2, "name": "店长2" } ],
    EmployeeRoleList: [],
    showAddModal: false,
    editingRole: {},
    isEditing: false,
    addEmployeeModalFormData: {
      name: { value: '' },
      code: { value: '' },
    },
    permissions: [],
    queryFormData: {
      name: { value: '' }, 
      jobEmployeeType: { value: '' },
      enableFlag: { value: '' },
    },
    queryResult: {
      content: [],
    },
  },

  effects: {
    *getEmployeeRoles(_, { call, put }) {
      const response = yield call(getEmployeeRoles);
    //   if (!response) {
    //     response = {"data":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":5,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534338859756,"serverUpdateTime":1534338859756,"sort":900000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f45c07c6-1445-4412-b5af-f610bd2f461c"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":6,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534341921890,"serverUpdateTime":1534341921890,"sort":800000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"6f9cab11-58ab-4f00-90d0-b5335f221618"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":1,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168060069,"serverUpdateTime":1534168060069,"sort":700000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"eae49042-0c88-47d8-8d8f-70f4b1d40910"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":3,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259632792,"serverUpdateTime":1534259632792,"sort":600000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f9896b55-27fe-407c-8a0a-7298cc4f534b"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":7,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534345162250,"serverUpdateTime":1534345162250,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"213d2c03-c2ff-4cd6-a550-77117757ed9d"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":15,"isCure":2,"isOrder":1,"name":"String","parentId":11,"serverCreateTime":1534082241089,"serverUpdateTime":1534429989860,"sort":300000,"statusFlag":1,"typeCode":"ffff","updatorId":0,"updatorName":"","uuid":"b956a567-2f63-4566-8422-fa16b887408f"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":2,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168678267,"serverUpdateTime":1534168678267,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"81ea563a-e1f6-468c-814e-a27e134877ac"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":4,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259705102,"serverUpdateTime":1534259705102,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"acbafa01-74ef-4312-a479-ddc3ff69fb0d"}],"dishTypeDesc":"","enabledFlag":1,"id":11,"isCure":2,"isOrder":1,"name":"保健","parentId":0,"serverCreateTime":1534079891779,"serverUpdateTime":1534079891779,"sort":500000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"8bd17894-38df-49bf-9ad2-72c02509cbff"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":8,"isCure":2,"isOrder":1,"name":"护肤类","parentId":0,"serverCreateTime":1534077078830,"serverUpdateTime":1534077078830,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"19d76e88-f84b-47f2-a55d-3c52b61e9a58"}],"message":"","messageType":"ignore","statusCode":200}
    //   }
      yield put({
        type: 'updateState',
        payload: {
            EmployeeRoleList: JSON.stringify(response.data) === '{}' ? [] : response.data,
        },
      });
    },
    *getEmployeeRole({ payload: { id } }, { call, put, select }) {
      const permissions = yield select(state => state.employee.permissions);
      if (!id) {
        permissions.forEach((item) => {
          item.checked = 0; // eslint-disable-line
        });
        yield put({
          type: 'updateState',
          payload: {
            editingRole: {},
            permissions: JSON.parse(JSON.stringify(permissions)),
          },
        });
        return; 
      }
      const response = yield call(getEmployeeRole, id);
      permissions.forEach((item) => {
        item.checked = 0; // eslint-disable-line
      });
      const cPermissions = response.data.authRolePermissions.map(cItem => cItem.authPermissionBo);
      permissions.forEach((item) => {
        if (cPermissions.some(cPermission =>
          `${cPermission.id}` === `${item.id}` && `${cPermission.checked}` === '1')) {
          item.checked = 1; // eslint-disable-line
        }
      })
      yield put({
        type: 'updateState',
        payload: {
          editingRole: JSON.stringify(response.data) === '{}' ? [] : response.data,
          permissions: JSON.parse(JSON.stringify(permissions)),
        },
      });
    },
    *queryEmployee(_, { call, put, select }) {
      const queryFormData = yield select(state => state.employee.queryFormData);
      const selectedRoleId = yield select(state => state.employee.selectedRoleId);
      const roleId = selectedRoleId;

      const params = {
        name: queryFormData.name.value,
        jobEmployeeType: queryFormData.jobEmployeeType.value,
        enableFlag: queryFormData.enableFlag.value,
      }
      if (roleId) {
        params.roleId = roleId;
      }
      // if (_.payload && _.payload.selectedRole) {
      //   parameter = {
      //     roleId: _.payload.selectedRoleId,
      //   }
      // }
      const response = yield call(getEmployees, params);
    //   if (!response) {
    //     response = {"data":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":5,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534338859756,"serverUpdateTime":1534338859756,"sort":900000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f45c07c6-1445-4412-b5af-f610bd2f461c"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":6,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534341921890,"serverUpdateTime":1534341921890,"sort":800000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"6f9cab11-58ab-4f00-90d0-b5335f221618"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":1,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168060069,"serverUpdateTime":1534168060069,"sort":700000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"eae49042-0c88-47d8-8d8f-70f4b1d40910"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":3,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259632792,"serverUpdateTime":1534259632792,"sort":600000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f9896b55-27fe-407c-8a0a-7298cc4f534b"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":7,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534345162250,"serverUpdateTime":1534345162250,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"213d2c03-c2ff-4cd6-a550-77117757ed9d"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":15,"isCure":2,"isOrder":1,"name":"String","parentId":11,"serverCreateTime":1534082241089,"serverUpdateTime":1534429989860,"sort":300000,"statusFlag":1,"typeCode":"ffff","updatorId":0,"updatorName":"","uuid":"b956a567-2f63-4566-8422-fa16b887408f"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":2,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168678267,"serverUpdateTime":1534168678267,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"81ea563a-e1f6-468c-814e-a27e134877ac"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":4,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259705102,"serverUpdateTime":1534259705102,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"acbafa01-74ef-4312-a479-ddc3ff69fb0d"}],"dishTypeDesc":"","enabledFlag":1,"id":11,"isCure":2,"isOrder":1,"name":"保健","parentId":0,"serverCreateTime":1534079891779,"serverUpdateTime":1534079891779,"sort":500000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"8bd17894-38df-49bf-9ad2-72c02509cbff"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":8,"isCure":2,"isOrder":1,"name":"护肤类","parentId":0,"serverCreateTime":1534077078830,"serverUpdateTime":1534077078830,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"19d76e88-f84b-47f2-a55d-3c52b61e9a58"}],"message":"","messageType":"ignore","statusCode":200}
    //   }
      yield put({
        type: 'updateState',
        payload: {
          queryResult: JSON.stringify(response.data) === '{}' ? [] : response.data,
        },
      });
    },
    *getAllEmployeePermissions(_, { call, put }) {
      const response = yield call(getAllPermission);
      yield put({
        type: 'updateState',
        payload: {
            permissions: response.data,
        },
      });
    },
    *updateStatusFlag({ payload: { id, statusFlag } }, { call, put }) {
      yield call(getAllPermission);
    //   if (!response) {
    //     response = {"data":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":5,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534338859756,"serverUpdateTime":1534338859756,"sort":900000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f45c07c6-1445-4412-b5af-f610bd2f461c"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":6,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534341921890,"serverUpdateTime":1534341921890,"sort":800000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"6f9cab11-58ab-4f00-90d0-b5335f221618"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":1,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168060069,"serverUpdateTime":1534168060069,"sort":700000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"eae49042-0c88-47d8-8d8f-70f4b1d40910"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":3,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259632792,"serverUpdateTime":1534259632792,"sort":600000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f9896b55-27fe-407c-8a0a-7298cc4f534b"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":7,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534345162250,"serverUpdateTime":1534345162250,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"213d2c03-c2ff-4cd6-a550-77117757ed9d"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":15,"isCure":2,"isOrder":1,"name":"String","parentId":11,"serverCreateTime":1534082241089,"serverUpdateTime":1534429989860,"sort":300000,"statusFlag":1,"typeCode":"ffff","updatorId":0,"updatorName":"","uuid":"b956a567-2f63-4566-8422-fa16b887408f"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":2,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168678267,"serverUpdateTime":1534168678267,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"81ea563a-e1f6-468c-814e-a27e134877ac"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":4,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259705102,"serverUpdateTime":1534259705102,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"acbafa01-74ef-4312-a479-ddc3ff69fb0d"}],"dishTypeDesc":"","enabledFlag":1,"id":11,"isCure":2,"isOrder":1,"name":"保健","parentId":0,"serverCreateTime":1534079891779,"serverUpdateTime":1534079891779,"sort":500000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"8bd17894-38df-49bf-9ad2-72c02509cbff"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":8,"isCure":2,"isOrder":1,"name":"护肤类","parentId":0,"serverCreateTime":1534077078830,"serverUpdateTime":1534077078830,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"19d76e88-f84b-47f2-a55d-3c52b61e9a58"}],"message":"","messageType":"ignore","statusCode":200}
    //   }
      yield call(updateStatusFlag, { id, statusFlag });
      yield put({
        type: 'queryEmployee',
      });
    },
    *saveEmployeeRole(_, { call, put, select }) {
      const addEmployeeModalFormData = yield select(state => state.employee.addEmployeeModalFormData);
      const permissions = yield select(state => state.employee.permissions);
      const editingRole = yield select(state => state.employee.editingRole);
      const isEditing = yield select(state => state.employee.isEditing);
    //   if (!response) {
    //     response = {"data":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":5,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534338859756,"serverUpdateTime":1534338859756,"sort":900000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f45c07c6-1445-4412-b5af-f610bd2f461c"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":6,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534341921890,"serverUpdateTime":1534341921890,"sort":800000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"6f9cab11-58ab-4f00-90d0-b5335f221618"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":1,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168060069,"serverUpdateTime":1534168060069,"sort":700000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"eae49042-0c88-47d8-8d8f-70f4b1d40910"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":3,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259632792,"serverUpdateTime":1534259632792,"sort":600000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f9896b55-27fe-407c-8a0a-7298cc4f534b"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":7,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534345162250,"serverUpdateTime":1534345162250,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"213d2c03-c2ff-4cd6-a550-77117757ed9d"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":15,"isCure":2,"isOrder":1,"name":"String","parentId":11,"serverCreateTime":1534082241089,"serverUpdateTime":1534429989860,"sort":300000,"statusFlag":1,"typeCode":"ffff","updatorId":0,"updatorName":"","uuid":"b956a567-2f63-4566-8422-fa16b887408f"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":2,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168678267,"serverUpdateTime":1534168678267,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"81ea563a-e1f6-468c-814e-a27e134877ac"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":4,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259705102,"serverUpdateTime":1534259705102,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"acbafa01-74ef-4312-a479-ddc3ff69fb0d"}],"dishTypeDesc":"","enabledFlag":1,"id":11,"isCure":2,"isOrder":1,"name":"保健","parentId":0,"serverCreateTime":1534079891779,"serverUpdateTime":1534079891779,"sort":500000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"8bd17894-38df-49bf-9ad2-72c02509cbff"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":8,"isCure":2,"isOrder":1,"name":"护肤类","parentId":0,"serverCreateTime":1534077078830,"serverUpdateTime":1534077078830,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"19d76e88-f84b-47f2-a55d-3c52b61e9a58"}],"message":"","messageType":"ignore","statusCode":200}
    //   }
      const param = {
        code: addEmployeeModalFormData.code.value,
        name: addEmployeeModalFormData.name.value,
        authRolePermissions: permissions.filter(item => item.checked === 1).map((item) => {
          return {
            permissionId: item.id,
            platform: item.platform,
          };
        }),
      };
      if (isEditing) {
        yield call(updateEmployeeRole, {...editingRole, ...param});
        notification.success({
          description: '更新角色信息成功'
        });
      } else {
        yield call(addEmployeeRole, param);
        notification.success({
          description: '添加角色成功'
        });
      }
      yield put({
        type: 'employee/getEmployeeRoles',
      });
      yield put({
        type: 'employee/updateState',
        payload: {
          showAddModal: false,
        },
      });
    },
    *deleteEmployeeRole({ payload: { id } }, { call, put }) {
      yield call(deleteEmployeeRoles, id);
      notification.success({
        description: '删除角色成功'
      });
      yield put({
        type: 'employee/getEmployeeRoles',
      });
    },
    *deleteEmployee({ payload: { id } }, { call, put }) {
      yield call(deleteEmployee, id);
      yield put({
        type: 'employee/queryEmployee',
      });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname }) => {
        if (pathname === '/employee' || pathname === '/employee-new') {
          dispatch({
            type: 'employee/getEmployeeRoles',
          });
          dispatch({
            type: 'employee/getAllEmployeePermissions',
          });
          
        }

        // if (pathname !== '/product-new') {
        //   const searchParam = parse(search, { ignoreQueryPrefix: true });
        //   const result = {};
        //   if (searchParam.selecteDishTypeId) {
        //     dispatch({
        //       type: 'product/updateState',
        //       payload: {
        //         selecteDishTypeId: searchParam.selecteDishTypeId
        //       }
        //     });
        //   }
        // }
        
      });
    },
  },
};
