import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { loginSelector } from './userFarmSlice';
import _ from 'lodash';

export function onLoadingStart(state) {
  state.loading = true;
}

export function onLoadingFail(state, { payload: error }) {
  state.loading = false;
  state.error = error;
  state.loaded = true;
}

export function onLoadingSuccess(state) {
  state.loading = false;
  state.error = null;
  state.loaded = true;
}

const adminRoles = [1, 2, 5];

export const initialState = {
  farmIdStoreIdTuple: [
    // {farm_id, store_id}
  ],
  byFarmIdStoreId: {
    // farm_id1:{
    //   store_id1:{...userStore},
    //   store_id2:{...userStore},
    // },
    // farm_id2:{
    //   store_id3:{...userStore},
    //   store_id4:{...userStore},
    // }
  },
  products: [],
  loading: false,
  error: undefined,
  loaded: false,
  farm_id: undefined,
  product_store_id: undefined,
  service_store_id: undefined,
  selected_product: undefined,
  selected_service: undefined,
  stripe_account_id: undefined,
  redirect_url: undefined,
  view_redirect_url: undefined,
};

const addFarmStore = (state, { payload: farmStore }) => {
  state.loading = false;
  state.error = null;
  const { farm_id, store_id } = farmStore;
  if(!(state.byFarmIdStoreId[farm_id] && state.byFarmIdStoreId[farm_id][store_id])) {
    state.farmIdStoreIdTuple.push({ farm_id, store_id });
  }
  state.byFarmIdStoreId[farm_id] = state.byFarmIdStoreId[farm_id] || {};
  state.byFarmIdStoreId[farm_id][store_id] = farmStore;
};

const removeFarmStore = (state, { payload: farmStore }) => {
  const { farm_id, store_id } = farmStore;
  if(state.byFarmIdStoreId[farm_id]?.[store_id]) {
    delete state.byFarmIdStoreId[farm_id]?.[store_id];
    state.farmIdStoreIdTuple = state.farmIdStoreIdTuple.filter(
      (farmIdStoreIdTuple) =>
        farmIdStoreIdTuple.farm_id !== farm_id && farmIdStoreIdTuple.store_id !== store_id,
    );
  }
};

const storeFrontSlice = createSlice({
  name: 'farmStoreReducer',
  initialState,
  reducers: {
    onLoadingFarmStoresStart: onLoadingStart,
    onLoadingFarmStoresFail: onLoadingFail,
    loginSuccess: (state, { payload: { user_id } }) => {
      state.user_id = user_id;
    },
    getStoreStripeSuccess: (state, { payload: { stripe_account_id } }) => {
      state.stripe_account_id = stripe_account_id;
    },
    redirectStripeSuccess: (state, { payload: { redirect_url, view_redirect_url } }) => {
      state.loading = false;
      state.redirect_url = redirect_url;
      state.view_redirect_url = view_redirect_url;
    },
    storeProductEdit: (state, { payload }) => {
      state.selected_product = payload;
    },
    storeServiceEdit: (state, { payload }) => {
      state.selected_service = payload;
    },
    postStoreSuccess: addFarmStore,
    patchStoreSuccess: addFarmStore,
    selectStoreSuccess: (state, { payload: { service_store_id, product_store_id } }) => {
      if(service_store_id) state.service_store_id = service_store_id;
      if(product_store_id) state.product_store_id = product_store_id;
      
    },
    logoutSuccess: (state) => {
      state.user_id = undefined;
      state.farm_id = undefined;
      state.product_store_id = undefined;
      state.service_store_id = undefined;
    },
    getProductStoresSuccess: (state, { payload: products }) => {
      state.loading = false;
      state.error = null;
      state.loaded = true;
      state.products = products;
    },
    deselectFarmSuccess: (state) => (state.farm_id = undefined),
    getUserFarmStoresSuccess: (state, { payload: farmStores }) => {
      state.loading = false;
      state.error = null;
      state.loaded = true;
      _.forEach(farmStores, farmStore => {
        if(farmStore && farmStore.store_id) {
          const { farm_id, store_id } = farmStore;
          if(!(state.byFarmIdStoreId[farm_id] && state.byFarmIdStoreId[farm_id][store_id])) {
            state.farmIdStoreIdTuple.push({ farm_id, store_id });
          }
          state.byFarmIdStoreId[farm_id] = state.byFarmIdStoreId[farm_id] || {};
          state.byFarmIdStoreId[farm_id][store_id] = {};
          // state.byFarmIdStoreId[farm_id][store_id] = farmStore
          Object.assign(state.byFarmIdStoreId[farm_id][store_id], farmStore);
          if(farmStore.type === 'grow-service') {
            state.service_store_id = store_id;
          } else {
            state.product_store_id = store_id;
          }
          state.farm_id = farm_id;
        }
      });
      
    },
    setLoadingStart: (state) => {
      state.loading = true;
    },
    setLoadingEnd: (state) => {
      state.loading = false;
    },
  },
});

export const {
  onLoadingFarmStoresStart,
  onLoadingFarmStoresFail,
  storeProductEdit,
  storeServiceEdit,
  getUserFarmStoresSuccess,
  getProductStoresSuccess,
  redirectStripeSuccess,
  patchStoreSuccess,
  deselectFarmSuccess,
  getStoreStripeSuccess,
  postStoreSuccess,
  loginSuccess,
  logoutSuccess,
  selectStoreSuccess,
  setLoadingStart,
  setLoadingEnd,
} = storeFrontSlice.actions;
export default storeFrontSlice.reducer;

export const farmStoreReducerSelector = (state) => state.storeReducer[storeFrontSlice.name];

export const farmProductStoreSelector = createSelector(
  [loginSelector, farmStoreReducerSelector],
  ({ farm_id, user_id }, {
    byFarmIdStoreId, product_store_id, stripe_account_id,
    redirect_url, view_redirect_url, loading, products, error, selected_product,
  }) => {
    
    return farm_id && user_id && product_store_id && byFarmIdStoreId[farm_id]
      ? {
        loading,
        stripe_account_id,
        redirect_url,
        view_redirect_url,
        products,
        selected_product,
        product_store_id,
        ...byFarmIdStoreId[farm_id][product_store_id],
      }
      : { stripe_account_id, redirect_url, view_redirect_url, loading };
  },
);

export const farmServiceStoreSelector = createSelector(
  [loginSelector, farmStoreReducerSelector],
  ({ farm_id, user_id }, {
    byFarmIdStoreId, service_store_id, stripe_account_id,
    redirect_url, view_redirect_url, loading, products, error, selected_service,
  }) => {
    
    return farm_id && user_id && service_store_id && byFarmIdStoreId[farm_id]
      ? {
        loading,
        stripe_account_id,
        redirect_url,
        view_redirect_url,
        products,
        selected_service,
        service_store_id,
        ...byFarmIdStoreId[farm_id][service_store_id],
      }
      : { stripe_account_id, redirect_url, view_redirect_url, loading };
  },
);

