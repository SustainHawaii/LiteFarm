import { call, put, select, takeLeading } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import apiConfig from '../../apiConfig';
import { loginSelector } from '../userFarmSlice';
import { axios, getHeader } from '../saga';
import i18n from '../../locales/i18n';
import { enqueueErrorSnackbar } from '../Snackbar/snackbarSlice';

const { farmStoreUrl } = apiConfig;

export const uploadStoreImage = createAction(`uploadStoreImageSaga`);

export function* uploadStoreImageSaga({
  payload: { file, onUploadSuccess, onUploadFail, targetRoute },
}) {
  let { user_id, farm_id } = yield select(loginSelector);
  const header = getHeader(user_id, farm_id, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  try {
    const imageRoute = `${farmStoreUrl}`
    const formData = new FormData();
    formData.append('_file_', file);
    const result = yield call(axios.post, `${imageRoute}/upload/farm/${farm_id}`, formData, header);
    onUploadSuccess?.(result.data.url);
  } catch (e) {
    yield put(enqueueErrorSnackbar(i18n.t('message:ATTACHMENTS.ERROR.FAILED_UPLOAD')));
    console.log(e);
    onUploadFail?.(e.response?.data);
  }
}

export default function* storeImageUploaderSaga() {
  yield takeLeading(uploadStoreImage.type, uploadStoreImageSaga);
}