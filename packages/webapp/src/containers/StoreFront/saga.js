/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (saga.js) is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import apiConfig, { stripeRedirectUrl } from './../../apiConfig';
import {
  loginSelector, userFarmSelector,
} from '../userFarmSlice';

import { createAction } from '@reduxjs/toolkit';
import { axios, getHeader } from '../saga';
import {
  farmStoreSelector,
  getStoreStripeSuccess,
  getUserFarmStoresSuccess,
  setLoadingStart,
  setLoadingEnd,
  onLoadingFarmStoresFail,
  onLoadingFarmStoresStart,
  patchStoreSuccess,
  postStoreSuccess,
  redirectStripeSuccess,
  selectStoreSuccess,
  getProductStoresSuccess,
} from '../storeFrontSlice';
import history from '../../history';
import { enqueueErrorSnackbar } from '../Snackbar/snackbarSlice';
import i18n from '../../locales/i18n';

export const getFarmStores = createAction('getFarmStoresSaga');

export function* getFarmStoresSaga() {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const header = getHeader(user_id, farm_id);
    yield put(onLoadingFarmStoresStart());
    const result = yield call(axios.get, farmStoreUrl + '/farm/' + farm_id, header);
    yield put(getUserFarmStoresSuccess(result.data));
    const resultProducts = yield call(axios.get, farmStoreUrl + '/products/' + farm_id, header);
    yield put(getProductStoresSuccess(resultProducts.data));
    yield put(setLoadingEnd());
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
    console.log('failed to fetch farm stores from database');
  }
}

export const getFarmProducts = createAction('getFarmProductsSaga');

export function* getFarmProductsSaga() {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const header = getHeader(user_id, farm_id);
    yield put(onLoadingFarmStoresStart());
    const result = yield call(axios.get, farmStoreUrl + '/products/' + farm_id, header);
    yield put(setLoadingEnd());
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
    console.log('failed to fetch farm stores from database');
  }
}

export const createStoreAccount = createAction('createStoreAccountSaga');

export function* createStoreAccountSaga({ payload: { ...postData } }) {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const store = yield select(farmStoreSelector);
    const { stripe_account_id } = store;
    const { phone_number, last_name, first_name } = postData;
    let storeData = {
      store_name: postData.store_name,
      address: postData.address,
      grid_points: postData.grid_points,
      country: postData.country,
      img_src: `${postData.img_src}`,
      store_desc: postData.store_desc,
      consent_checkbox: postData.consent_checkbox,
      consent_content: postData.consent_content,
      phone_number,
      farm_id,
    };
    
    const stripeData = {
      phone_number,
      last_name,
      first_name,
      redirect_url: stripeRedirectUrl,
    };
    const header = getHeader(user_id, farm_id);
    
    let resultState;
    
    if(!stripe_account_id) {
      resultState = yield call(axios.post, farmStoreUrl + '/createStripe/' + farm_id, stripeData, header);
    }
    const addStoreResult = yield call(axios.post, farmStoreUrl + '/' + farm_id, storeData, header);
    const storeCreated = addStoreResult.data?.result;
    const { store_id } = storeCreated;
    if(resultState) {
      yield put(redirectStripeSuccess({ redirect_url: resultState.data?.url }));
    }
    yield put(postStoreSuccess(storeCreated));
    yield put(selectStoreSuccess({ store_id }));
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
    console.log('failed to fetch farm stores from database');
  }
}

export const searchFood = createAction('searchFoodSaga');

export function* searchFoodSaga({ payload: { search, setFoodItems } }) {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const header = getHeader(user_id, farm_id);
    const result = yield call(axios.get, farmStoreUrl + '/' + farm_id + '/searchFood?query=' + search, header);
    setFoodItems(result.data);
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
  }
}

export const createStripeAccount = createAction('createStripeAccountSaga');

export function* createStripeAccountSaga() {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const { phone_number, last_name, first_name } = yield select(userFarmSelector);
    const stripeData = {
      phone_number,
      last_name,
      first_name,
      redirect_url: stripeRedirectUrl,
    };
    const header = getHeader(user_id, farm_id);
    yield put(setLoadingStart());
    const resultState = yield call(axios.post, farmStoreUrl + '/createStripe/' + farm_id, stripeData, header);
    yield put(redirectStripeSuccess({ redirect_url: resultState.data?.url }));
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
  }
}

export const createStoreProduct = createAction('createStoreProductSaga');

export function* createStoreProductSaga({ payload }) {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const header = getHeader(user_id, farm_id);
    yield put(setLoadingStart());
    const resultState = yield call(axios.post, farmStoreUrl + '/createProduct/' + farm_id, payload, header);
    yield call(history.push, '/store_front');
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
  }
}

export const updateStoreProduct = createAction('updateStoreProductSaga');

export function* updateStoreProductSaga({ payload }) {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const header = getHeader(user_id, farm_id);
    yield put(setLoadingStart());
    const resultState = yield call(axios.post, farmStoreUrl + '/updateProduct/' + farm_id, payload, header);
    yield call(history.push, '/store_front');
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
  }
}

export const viewStripeAccount = createAction('viewStripeAccountSaga');

export function* viewStripeAccountSaga() {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const { phone_number } = yield select(userFarmSelector);
    const header = getHeader(user_id, farm_id);
    yield put(setLoadingStart());
    const result = yield call(axios.get, farmStoreUrl + '/viewStripe/' + farm_id + '/' + phone_number, header);
    yield put(redirectStripeSuccess({ view_redirect_url: result.data?.url }));
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
  }
}

export const getStripeAccount = createAction('getStripeAccountSaga');

export function* getStripeAccountSaga() {
  const { farmStoreUrl } = apiConfig;
  try {
    const { farm_id, user_id } = yield select(loginSelector);
    const { phone_number } = yield select(userFarmSelector);
    const header = getHeader(user_id, farm_id);
    const result = yield call(axios.get, farmStoreUrl + '/checkStripe/' + farm_id + '/' + phone_number, header);
    yield put(getStoreStripeSuccess({ stripe_account_id: result.data }));
  } catch (error) {
    yield put(onLoadingFarmStoresFail(error));
  }
}

export const postStore = createAction('postStoreSaga');

export function* postStoreSaga({ payload: { showFarmNameCharacterLimitExceededError, ...store } }) {
  const { farm_id, user_id } = yield select(loginSelector);
  yield put(setLoadingStart());
  let addStoreData = {
    store_name: store.store_name,
    address: store.address,
    grid_points: store.grid_points,
    country: store.country,
    img_src: store.img_src,
    store_desc: store.store_desc,
    consent_checkbox: store.consent_checkbox,
    consent_content: store.consent_content,
  };
  const header = getHeader(user_id, farm_id);
  const { farmStoreUrl } = apiConfig;
  try {
    const addStoreResult = yield call(axios.post, farmStoreUrl + '/' + farm_id, addStoreData, header);
    const store = addStoreResult.data;
    const { store_id } = store;
    yield put(postStoreSuccess(store));
    yield put(selectStoreSuccess({ store_id }));
    
  } catch (e) {
    yield put(setLoadingEnd());
  }
}

export const patchStore = createAction('patchStoreSaga');

export function* patchStoreSaga({ payload: { showFarmNameCharacterLimitExceededError, ...store } }) {
  const { store_id, farm_id } = yield select(farmStoreSelector);
  const { user_id } = yield select(loginSelector);
  const header = getHeader(user_id, farm_id);
  
  let patchStoreData = {
    store_name: store.store_name,
    address: store.address,
    grid_points: store.grid_points,
    country: store.country,
    img_src: store.img_src,
    store_desc: store.store_desc,
    consentCheckbox: store.consentCheckbox,
  };
  const { farmStoreUrl } = apiConfig;
  try {
    const patchedStore = yield call(axios.patch, `${farmStoreUrl}/${store_id}`, patchStoreData, header);
    const store = patchedStore.data[0];
    yield put(patchStoreSuccess({ ...store, store_id }));
  } catch (e) {
    console.error(e);
  }
}

export default function* chooseStoreSaga() {
  yield takeLeading(postStore.type, postStoreSaga);
  yield takeLeading(patchStore.type, patchStoreSaga);
  yield takeLatest(getFarmStores.type, getFarmStoresSaga);
  yield takeLatest(getStripeAccount.type, getStripeAccountSaga);
  yield takeLatest(createStoreAccount.type, createStoreAccountSaga);
  yield takeLatest(viewStripeAccount.type, viewStripeAccountSaga);
  yield takeLatest(createStripeAccount.type, createStripeAccountSaga);
  yield takeLatest(createStoreProduct.type, createStoreProductSaga);
  yield takeLatest(getFarmProducts.type, getFarmProductsSaga);
  yield takeLatest(searchFood.type, searchFoodSaga);
  yield takeLatest(updateStoreProduct.type, updateStoreProductSaga);
}
