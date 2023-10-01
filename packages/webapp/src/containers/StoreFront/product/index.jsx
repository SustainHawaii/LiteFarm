import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  userFarmsByUserSelector,
} from '../../userFarmSlice';

import {
  getFarmStores,
  getStripeAccount,
} from '../saga';
import { useTranslation } from 'react-i18next';
import { farmProductStoreSelector, setLoadingStart } from '../../storeFrontSlice';
import ProductStoreSetup from './ProductStoreSetup';
import ProductStoreView from './ProductStoreView';
import { CircularProgress } from '@material-ui/core';

const ProductStoreFront = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const store = useSelector(farmProductStoreSelector);
  const user = useSelector(userFarmsByUserSelector);
  const farms = useSelector(userFarmsByUserSelector);
  const [setup, setSetup] = useState(false);
  
  useEffect(() => {
    dispatch(getFarmStores());
    dispatch(getStripeAccount());
  }, []);
  
  useEffect(() => {
    if(store.redirect_url) {
      dispatch(setLoadingStart());
      window.location.href = store.redirect_url;
    }
    if(store.view_redirect_url) {
      dispatch(setLoadingStart());
      window.location.href = store.view_redirect_url;
    }
  }, [store]);
  
  return (
    <>
      {store.loading && <CircularProgress size={50} style={{ margin: 'auto' }} />}
      {!store.loading && (!store.product_store_id || setup) &&
      <ProductStoreSetup store={store} user={user} farms={farms} setup={setup} setSetup={setSetup} />
      }
      {!store.loading && (store.product_store_id && !setup) &&
      <ProductStoreView store={store} user={user} farms={farms} setup={setup} setSetup={setSetup} />
      }
    </>
  );
};

export default ProductStoreFront;

