import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { loginSelector } from './userFarmSlice';

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
  store_id: undefined,
  selected_product: undefined,
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
      console.log('payload is', stripe_account_id);
      state.stripe_account_id = stripe_account_id;
    },
    redirectStripeSuccess: (state, { payload: { redirect_url, view_redirect_url } }) => {
      console.log('payload is', { redirect_url, view_redirect_url });
      state.loading = false;
      state.redirect_url = redirect_url;
      state.view_redirect_url = view_redirect_url;
    },
    storeProductEdit: (state, { payload }) => {
      state.selected_product = payload;
    },
    postStoreSuccess: addFarmStore,
    patchStoreSuccess: addFarmStore,
    selectStoreSuccess: (state, { payload: { store_id } }) => {
      state.store_id = store_id;
    },
    logoutSuccess: (state) => {
      state.user_id = undefined;
      state.farm_id = undefined;
      state.store_id = undefined;
    },
    getProductStoresSuccess: (state, { payload: products }) => {
      state.loading = false;
      state.error = null;
      state.loaded = true;
      state.products = products;
    },
    deselectFarmSuccess: (state) => (state.farm_id = undefined),
    getUserFarmStoresSuccess: (state, { payload: farmStore }) => {
      state.loading = false;
      state.error = null;
      state.loaded = true;
      if(farmStore && farmStore.store_id) {
        const { farm_id, store_id } = farmStore;
        if(!(state.byFarmIdStoreId[farm_id] && state.byFarmIdStoreId[farm_id][store_id])) {
          state.farmIdStoreIdTuple.push({ farm_id, store_id });
        }
        const prevUserStores = state.farmIdStoreIdTuple[farm_id] || {};
        state.byFarmIdStoreId[farm_id] = prevUserStores;
        state.byFarmIdStoreId[farm_id][store_id] = prevUserStores[store_id] || {};
        Object.assign(state.byFarmIdStoreId[farm_id][store_id], farmStore);
        state.store_id = store_id;
        state.farm_id = farm_id;
        console.log('got data', farmStore);
        
      }
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

export const farmStoreSelector = createSelector(
  [loginSelector, farmStoreReducerSelector],
  ({ farm_id, user_id }, {
    byFarmIdStoreId, store_id, stripe_account_id,
    redirect_url, view_redirect_url, loading, products, error, selected_product,
  }) => {
    
    return farm_id && user_id && store_id && byFarmIdStoreId[farm_id]
      ? {
        loading,
        stripe_account_id,
        redirect_url,
        view_redirect_url,
        products,
        selected_product,
        ...byFarmIdStoreId[farm_id][store_id],
      }
      : { stripe_account_id, redirect_url, view_redirect_url, loading };
  },
);

