import { parse } from 'qs';
import moment from 'moment';
import { fieldsKeys as newFormFieldsKeys } from '../routes/Employee/New/NewEmployeeForm'
import { getLatestEmployee, addNewEmployee, getEmployee, updateNewEmployee } from '../services/employee-new';

const dateKeys = 'jobEntryTime jobPositiveTime intoWorkDate birthday'.split(' ');
const initNewEmployeeFormData = newFormFieldsKeys.reduce((result, item) => {
  result[item] = { value: '' };
  if(item === 'gender')  {
    result[item] = { value: '0' };
  }
  if (dateKeys.indexOf(item) > -1) {
    try{
      result[item] = { value: moment() };
    } catch(e) {}
  }
  return result;
}, {});


export default {
  namespace: 'employee-new',

  state: {
    newEmployeeFormData: initNewEmployeeFormData,
    latestEmployee: {},
    isView: false,
    isEdit: false,
    currentEmployee: {},
  },

  effects: {
    *newOrUpdateEmployee(_, { call, put, select }) {
      const newEmployeeFormData = yield select(state => state['employee-new'].newEmployeeFormData);
      const params = {};
      Object.keys(newEmployeeFormData).forEach((key) => {
        params[key] = newEmployeeFormData[key].value;
        if (dateKeys.indexOf(key) > -1) {
          try{
            params[key] = newEmployeeFormData[key].value['_d'].getTime();
          } catch(e) {}
        }
      })
      const { id } = yield select(state => state['employee-new']);
      if (id) {
        const response = yield call(updateNewEmployee, params);
      }  else {
        const response = yield call(addNewEmployee, params);
      }
    //   if (!response) {
    //     response = {"data":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":5,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534338859756,"serverUpdateTime":1534338859756,"sort":900000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f45c07c6-1445-4412-b5af-f610bd2f461c"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":6,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534341921890,"serverUpdateTime":1534341921890,"sort":800000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"6f9cab11-58ab-4f00-90d0-b5335f221618"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":1,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168060069,"serverUpdateTime":1534168060069,"sort":700000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"eae49042-0c88-47d8-8d8f-70f4b1d40910"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":3,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259632792,"serverUpdateTime":1534259632792,"sort":600000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"f9896b55-27fe-407c-8a0a-7298cc4f534b"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":7,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534345162250,"serverUpdateTime":1534345162250,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"213d2c03-c2ff-4cd6-a550-77117757ed9d"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":15,"isCure":2,"isOrder":1,"name":"String","parentId":11,"serverCreateTime":1534082241089,"serverUpdateTime":1534429989860,"sort":300000,"statusFlag":1,"typeCode":"ffff","updatorId":0,"updatorName":"","uuid":"b956a567-2f63-4566-8422-fa16b887408f"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":2,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534168678267,"serverUpdateTime":1534168678267,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"81ea563a-e1f6-468c-814e-a27e134877ac"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":4,"isCure":2,"isOrder":1,"name":"肾部保养","parentId":11,"serverCreateTime":1534259705102,"serverUpdateTime":1534259705102,"sort":200000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"acbafa01-74ef-4312-a479-ddc3ff69fb0d"}],"dishTypeDesc":"","enabledFlag":1,"id":11,"isCure":2,"isOrder":1,"name":"保健","parentId":0,"serverCreateTime":1534079891779,"serverUpdateTime":1534079891779,"sort":500000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"8bd17894-38df-49bf-9ad2-72c02509cbff"},{"aliasName":"","brandIdenty":1,"creatorId":0,"creatorName":"","dishBrandTypeBoList":[],"dishTypeDesc":"","enabledFlag":1,"id":8,"isCure":2,"isOrder":1,"name":"护肤类","parentId":0,"serverCreateTime":1534077078830,"serverUpdateTime":1534077078830,"sort":300000,"statusFlag":1,"typeCode":"123456","updatorId":0,"updatorName":"","uuid":"19d76e88-f84b-47f2-a55d-3c52b61e9a58"}],"message":"","messageType":"ignore","statusCode":200}
    //   }
      yield put({
        type: 'updateState',
        payload: {
            EmployeeRoleList: response.data,
        },
      });
    },
    *getLatestEmployee(_, { call, put }) {
      const response = yield call(getLatestEmployee);
      yield put({
        type: 'updateState',
        payload: {
          latestEmployee: response.data,
        },
      });
    },
    *getCurrentEmployee({ payload: { id } }, { call, put, select }) {
      const response = yield call(getEmployee, id);
      const currenctEmployee = newFormFieldsKeys.reduce((result, item) => {
        result[item] = { value: `${response.data[item]}` || '' };
        result.password = '';
        result.passwordNum = '';
        if (dateKeys.indexOf(item) > -1) {
          result[item] = { value: moment(new Date(response.data[item])) }
        }
        return result;
      }, {});
      yield put({
        type: 'updateState',
        payload: {
          newEmployeeFormData: currenctEmployee,
        },
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
      return history.listen(({ pathname, search }) => {
        if (pathname === '/employee-new') {
          dispatch({
            type: 'employee-new/getLatestEmployee',
          });
          const searchParam = parse(search, { ignoreQueryPrefix: true });
          if (searchParam.isView) {
            const isView = searchParam.isView === 'true';
            dispatch({
              type: 'employee-new/updateState',
              payload: {
                isView,
              },
            });
          }
          if (searchParam.isEdit) {
            const isEdit = searchParam.isEdit === 'true';
            dispatch({
              type: 'employee-new/updateState',
              payload: {
                isEdit,
              },
            });
          }
          if (searchParam.id) {
            dispatch({
              type: 'employee-new/updateState',
              payload: {
                id: searchParam.id,
              },
            });
            dispatch({
              type: 'employee-new/getCurrentEmployee',
              payload: {
                id: searchParam.id,
              },
            });
          }
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
