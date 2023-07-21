/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (cropRoute.js) is part of LiteFarm.
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

import express from 'express';
const router = express.Router();
import hasFarmAccess from '../middleware/acl/hasFarmAccess.js';
import storeController from '../controllers/storeController.js'
import checkScope from '../middleware/acl/checkScope.js'


router.get(
  '/farm/:farm_id',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.getStoreDetails(),
);
router.get(
  '/products/:farm_id',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.getProductDetails(),
);
router.get(
  '/:farm_id/searchFood',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.searchFood(),
);
router.get(
  '/checkStripe/:farm_id/:phone_number',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.checkStripe(),
);
router.post(
  '/createStripe/:farm_id',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.createStripe(),
);
router.post(
  '/createProduct/:farm_id',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.createProduct(),
);
router.post(
  '/updateProduct/:farm_id',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.updateProduct(),
);
router.get(
  '/viewStripe/:farm_id/:phone_number',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.viewStripe(),
);
router.post(
  '/:farm_id',
  hasFarmAccess({ params: 'farm_id' }),
  checkScope(['manage:store']),
  storeController.addStoreDetails(),
);


export default router;
