import React from 'react';
import { useSelector } from 'react-redux';
import {
  userFarmSelector,
} from '../userFarmSlice';

import { farmStoreSelector } from '../storeFrontSlice';
import ProductSetup from './ProductSetup';
import { tasksSelector } from '../taskSlice';

const StoreProduct = () => {
  const store = useSelector(farmStoreSelector);
  const tasks = useSelector(tasksSelector);
  const user = useSelector(userFarmSelector);
  return (
    <ProductSetup store={store} tasks={tasks} user={user} />
  );
};

export default StoreProduct;

