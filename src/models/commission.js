// import { parse } from 'qs';
import { cloneDeep } from 'lodash/lang';
import { 
  queryPlan, deleteCommission, setCommissionStatus,
} from '../services/commission';

export default {
  namespace: 'commission',

  state: {
    queryFormData: {
      enableFlag: { value: '' },
      planType: { value: '' },
    },
    searchResult: {
      content: [],
    },
  },

  effects: {
    *queryPlan(_, { call, put, select }) {
      const queryFormData = yield select(state => state.commission.queryFormData);
      const params = {
        enableFlag: queryFormData.enableFlag.value,
        planType: queryFormData.planType.value,
      };
      const response = yield call(queryPlan, params);
      yield put({
        type: 'commission/updateState',
        payload: {
          searchResult: response.data,
        },
      })
    },
    *deleteCommission({ payload: { id } }, { call, put, select }) {
      yield call(deleteCommission, id);
      const searchResult = yield select(state => state.commission.searchResult);
      searchResult.content = searchResult.content.filter(item => `${item.id}` !== `${id}`);
      yield put({
        type: 'commission/updateState',
        payload: {
          searchResult: cloneDeep(searchResult),
        },
      });
    },
    *setCommissionStatus({ payload: { id, status } }, { call, put, select }) {
      yield call(setCommissionStatus, { id, status });
      const searchResult = yield select(state => state.commission.searchResult);
      searchResult.content.forEach((item) => {
        if (`${item.id}` === `${id}`) {
          item.enabledFlag = status; // eslint-disable-line
        }
      });
      yield put({
        type: 'commission/updateState',
        payload: {
          searchResult: cloneDeep(searchResult),
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
    setup({ history, dispatch }) { // eslint-disable-line
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      // return history.listen(({ pathname, search }) => {
        // if (pathname === '/setting' || pathname === '/') {
        //   dispatch({
        //     type: 'setting/getTableArea',
        //   });
        // }

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
        
      // });
    },
  },
};
