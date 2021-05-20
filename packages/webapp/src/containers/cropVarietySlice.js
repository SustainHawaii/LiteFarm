import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { loginSelector, onLoadingFail, onLoadingStart } from './userFarmSlice';
import { createSelector } from 'reselect';
import { pick } from '../util';
import { cropEntitiesSelector } from './cropSlice';

const getCropVariety = (obj) => {
  return pick(obj, [
    'crop_variety_id',
    'crop_id',
    'crop_variety_name',
    'farm_id',
    'supplier',
    'seeding_type',
    'lifecycle',
    'compliance_file_url',
    'organic',
    'treated',
    'genetically_engineered',
    'searched',
    'crop_variety_photo_url',
  ]);
};
const addOneCropVariety = (state, { payload }) => {
  state.loading = false;
  state.error = null;
  cropVarietyAdapter.upsertOne(state, getCropVariety(payload));
};

const updateOneCropVariety = (state, { payload }) => {
  state.loading = false;
  state.error = null;
  cropVarietyAdapter.updateOne(state, getCropVariety(payload));
};

const addManyCropVariety = (state, { payload: cropVarieties }) => {
  state.loading = false;
  state.error = null;
  cropVarietyAdapter.upsertMany(
    state,
    cropVarieties.map((cropVariety) => getCropVariety(cropVariety)),
  );
};

const cropVarietyAdapter = createEntityAdapter({
  selectId: (cropVariety) => cropVariety.crop_variety_id,
});

const cropVarietySlice = createSlice({
  name: 'cropVarietyReducer',
  initialState: cropVarietyAdapter.getInitialState({
    loading: false,
    error: undefined,
    loaded: false,
  }),
  reducers: {
    onLoadingCropVarietyStart: onLoadingStart,
    onLoadingCropVarietyFail: onLoadingFail,
    getCropVarietiesSuccess: addManyCropVariety,
    getAllCropVarietiesSuccess: (state, { payload: cropVarieties }) => {
      addManyCropVariety(state, { payload: cropVarieties });
      state.loaded = true;
    },
    postCropVarietySuccess: addOneCropVariety,
    putCropVarietySuccess(state, { payload: cropVariety }) {
      cropVarietyAdapter.updateOne(state, {
        changes: cropVariety,
        id: cropVariety.crop_variety_id,
      });
    },
    selectCropVarietySuccess(state, { payload: crop_id }) {
      state.crop_id = crop_id;
    },
  },
});
export const {
  getCropVarietiesSuccess,
  postCropVarietySuccess,
  putCropVarietySuccess,
  onLoadingCropVarietyStart,
  onLoadingCropVarietyFail,
  getAllCropVarietiesSuccess,
} = cropVarietySlice.actions;
export default cropVarietySlice.reducer;

export const cropVarietyReducerSelector = (state) => state.entitiesReducer[cropVarietySlice.name];

const cropVarietySelectors = cropVarietyAdapter.getSelectors(
  (state) => state.entitiesReducer[cropVarietySlice.name],
);

export const cropVarietyEntitiesSelector = cropVarietySelectors.selectEntities;

export const cropVarietiesSelector = createSelector(
  [cropVarietySelectors.selectAll, cropEntitiesSelector, loginSelector],
  (cropVarieties, cropEntities, { farm_id }) => {
    const cropVarietiesOfCurrentFarm = cropVarieties.filter(
      (cropVariety) => cropVariety.farm_id === farm_id,
    );
    return cropVarietiesOfCurrentFarm.map((cropVariety) => ({
      ...cropEntities[cropVariety.crop_id],
      ...cropVariety,
    }));
  },
);

export const cropVarietyByID = (variety_id) => (state) =>
  cropVarietySelectors.selectById(state, variety_id);

export const cropVarietySelector = (crop_variety_id) =>
  createSelector(
    [cropEntitiesSelector, cropVarietyByID(crop_variety_id)],
    (cropEntities, cropVariety) => {
      return { ...cropEntities[cropVariety.crop_id], ...cropVariety };
    },
  );

export const cropVarietyStatusSelector = createSelector(
  [cropVarietyReducerSelector],
  ({ loading, error }) => {
    return { loading, error };
  },
);

export const suppliersSelector = createSelector([cropVarietiesSelector], (cropVarieties) => {
  const suppliers = new Set(cropVarieties.map(({ supplier }) => supplier));
  suppliers.delete(null);
  return Array.from(suppliers);
});