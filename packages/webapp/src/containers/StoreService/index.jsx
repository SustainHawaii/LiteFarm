import React from 'react';
import { useSelector } from 'react-redux';
import {
  userFarmSelector,
} from '../userFarmSlice';

import { farmServiceStoreSelector } from '../storeFrontSlice';
import ServiceSetup from './ServiceSetup';
import { tasksSelector } from '../taskSlice';

const StoreService = () => {
  const store = useSelector(farmServiceStoreSelector);
  const tasks = useSelector(tasksSelector);
  const user = useSelector(userFarmSelector);
  return (
    <ServiceSetup store={store} tasks={tasks} user={user} />
  );
};

export default StoreService;

