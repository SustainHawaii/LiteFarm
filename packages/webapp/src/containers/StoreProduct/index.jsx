import React from 'react';
import { useSelector } from 'react-redux';
import {
  userFarmSelector,
} from '../userFarmSlice';

import { farmProductStoreSelector } from '../storeFrontSlice';
import ProductSetup from './ProductSetup';
import { tasksSelector } from '../taskSlice';

const StoreProduct = () => {
  const store = useSelector(farmProductStoreSelector);
  const tasks = useSelector(tasksSelector);
  const user = useSelector(userFarmSelector);
  return (
    <ProductSetup store={store} tasks={tasks} user={user} />
  );
};

export default StoreProduct;

