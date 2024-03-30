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
import {
  farmServiceStoreSelector,
  setLoadingStart,
} from '../../storeFrontSlice';
import ServiceStoreSetup from './ServiceStoreSetup';
import ServiceStoreView from './ServiceStoreView';
import { CircularProgress } from '@material-ui/core';

const ServiceStoreFront = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const store = useSelector(farmServiceStoreSelector);
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
      {!store.loading && (!store.service_store_id || setup) &&
      <ServiceStoreSetup store={store} user={user} farms={farms} setup={setup} setSetup={setSetup} />
      }
      {!store.loading && (store.service_store_id && !setup) &&
      <ServiceStoreView store={store} user={user} farms={farms} setup={setup} setSetup={setSetup} />
      }
    </>
  );
};

export default ServiceStoreFront;

