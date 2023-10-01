import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import history from '../../../history';
import { pick } from '../../../util/pick';
import { CardContent, CardHeader, CircularProgress, TextField, Typography } from '@material-ui/core';
import Card from '../../../components/Card';
import Select from 'react-select';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Form/Button';
import Form from '../../../components/Form';
import {
  createStoreService,
  getFarmStores,
  updateStoreProduct,
} from '../../StoreFront/saga';
import PageTitle from '../../../components/PageTitle/v2';
import { fieldsSelector } from '../../fieldSlice';
import { AddLink } from '../../../components/Typography';
import StoreImagePickerWrapper from '../../StoreImagePickerWrapper';
import clsx from 'clsx';
import storeStyles from '../../../components/AddStoreFront/store.scss';
import { Carousel } from 'react-responsive-carousel';
import Spinner from '../../../components/Spinner';

const style = {
  marginBottom: '28px',
};
const legendStyle = {
  background: 'rgb(45 185 141)',
  opacity: '0.65',
};

const units = {
  'ac': 'Acres',
};
const serviceTypes = [
  {
    value: 'grow-farm-service',
    label: 'Lease Out Farm Area',
  },
  {
    value: 'grow-tool-service',
    label: 'Lease Out Farm Tools',
  },
  {
    value: 'grow-manpower-service',
    label: 'Lease Out Farm Workers',
  },
];

const ServiceSetup = ({
  store,
  tasks,
  user,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fields = useSelector(fieldsSelector);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [storeImages, setStoreImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  
  const [foodItems, setFoodItems] = useState([]);
  
  const registerBasicFormFields = () => {
    const maxDaysRegister = register(MAXDAYS, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.MAXDAYS_IS_REQUIRED') },
    });
    const minDaysRegister = register(MINDAYS, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.MINDAYS_IS_REQUIRED') },
    });
    const startDateRegister = register(STARTDATE, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.STARTDATE_IS_REQUIRED') },
    });
    const skuRegister = register(SKU, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.SKU_IS_REQUIRED') },
    });
    const priceRegister = register(PRICE, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.PRICE_IS_REQUIRED') },
    });
    const descRegister = register(PRODDESC, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.DESC_IS_REQUIRED') },
    });
    const prodNameRegister = register(PRODNAME, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.PROD_NAME_IS_REQUIRED') },
    });
    const imgRegister = register(IMG_URLS, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.IMG_IS_REQUIRED') },
    });
    const preFixedInputs = [
      {
        label: t('STORE_SERVICE_SETUP.PROD_NAME'),
        hookFormRegister: prodNameRegister,
        onChange: updateProdName,
        disabled: store.selected_service,
        name: PRODNAME,
        type: 'text',
        errors: errors[PRODNAME]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.DESCRIPTION'),
        hookFormRegister: descRegister,
        onChange: updateDesc,
        disabled: store.selected_service,
        name: PRODDESC,
        type: 'text',
        errors: errors[PRODDESC]?.message,
      },
    ];
    
    const postFixedInputs = [
      {
        label: t('STORE_SERVICE_SETUP.SERVICE_START_DATE'),
        type: 'date',
        hookFormRegister: startDateRegister,
        disabled: store.selected_service,
        name: STARTDATE,
        errors: errors[STARTDATE]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.MIN_DAYS'),
        type: 'options',
        options: [
          {
            label: '7 Days',
            value: 7,
          },
          {
            label: '30 Days',
            value: 30,
          },
          {
            label: '90 Days',
            value: 90,
          },
          {
            label: '120 Days',
            value: 120,
          },
        ],
        hookFormRegister: minDaysRegister,
        onChange: minDaysChangeHandler,
        disabled: store.selected_service,
        name: MINDAYS,
        errors: errors[MINDAYS]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.MAX_DAYS'),
        type: 'options',
        options: [
          {
            label: '7 Days',
            value: 7,
          },
          {
            label: '30 Days',
            value: 30,
          },
          {
            label: '90 Days',
            value: 90,
          },
          {
            label: '120 Days',
            value: 120,
          },
        ],
        hookFormRegister: maxDaysRegister,
        onChange: maxDaysChangeHandler,
        disabled: store.selected_service,
        name: MAXDAYS,
        errors: errors[MAXDAYS]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.PRICE'),
        hookFormRegister: priceRegister,
        disabled: store.selected_service,
        onChange: updatePrice,
        name: PRICE,
        type: 'number',
        errors: errors[PRICE]?.message,
      },
    ];
    return { preFixedInputs, postFixedInputs };
  };
  
  const registerFarmFormFields = () => {
    const landAreaRegister = register(LANDAREA, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.LANDAREA_IS_REQUIRED') },
    });
    const organicStatusRegister = register(ORGANICSTATUS, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.ORGANICSTATUS_IS_REQUIRED') },
    });
    
    const farmAreaRegister = register(FARMAREA, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.FARMAREA_IS_REQUIRED') },
    });
    const soilTypeRegister = register(SOILTYPE, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.SOILTYPE_IS_REQUIRED') },
    });
    const irrigationTypeRegister = register(IRRIGATIONTYPE, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.IRRIGATIONTYPE_IS_REQUIRED') },
    });
    const hasFarmingToolsRegister = register(HASFARMINGTOOLS, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.HASFARMINGTOOLS_IS_REQUIRED') },
    });
    const hasPowerSupplyRegister = register(HASPOWERSUPPLY, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.HASPOWERSUPPLY_IS_REQUIRED') },
    });
    const farmServiceInputs = [
      
      {
        label: t('STORE_SERVICE_SETUP.FARM_AREA'),
        type: 'options',
        options: _.map(fields, field => {
          return {
            value: field.figure_id,
            label: field.name,
          };
        }),
        hookFormRegister: farmAreaRegister,
        onChange: farmAreaChangeHandler,
        disabled: store.selected_service,
        name: FARMAREA,
        errors: errors[FARMAREA]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.LAND_AREA'),
        hookFormRegister: landAreaRegister,
        disabled: true,
        name: LANDAREA,
        type: 'text',
        errors: errors[LANDAREA]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.ORGANIC_STATUS'),
        hookFormRegister: organicStatusRegister,
        disabled: true,
        name: ORGANICSTATUS,
        type: 'text',
        errors: errors[ORGANICSTATUS]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.SOIL_TYPE'),
        type: 'options',
        options: [
          {
            label: ' Alfisols - Characterized by a clay-rich subsoil and high levels of calcium and magnesium',
            value: ' Alfisols - Characterized by a clay-rich subsoil and high levels of calcium and magnesium',
          },
          {
            label: 'Histosols - Characterized by a high level of organic content',
            value: 'Histosols - Characterized by a high level of organic content',
          },
          {
            label: 'Mollisols - Characterized by a deep, dark, fertile topsoil',
            value: 'Mollisols - Characterized by a deep, dark, fertile topsoil',
          },
          {
            label: 'Oxisols - Characterized by high levels of iron and aluminum oxides',
            value: 'Oxisols - Characterized by high levels of iron and aluminum oxides',
          },
          {
            label: 'Ultisols - Characterized by a clay-rich subsoil and high levels of aluminum and iron',
            value: 'Ultisols - Characterized by a clay-rich subsoil and high levels of aluminum and iron',
          },
          {
            label: 'Vertisols - Characterized by a high level of shrink-swell potential due to a high clay content',
            value: 'Vertisols - Characterized by a high level of shrink-swell potential due to a high clay content',
            
          }],
        hookFormRegister: soilTypeRegister,
        onChange: soilTypeChangeHandler,
        disabled: store.selected_service,
        name: SOILTYPE,
        errors: errors[SOILTYPE]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.IRRIGATION_TYPE'),
        type: 'options',
        options: [
          {
            label: 'Flood Irrigation',
            value: 'Flood Irrigation',
          },
          {
            label: 'Sprinkler Irrigation',
            value: 'Sprinkler Irrigation',
          },
          {
            label: 'Drip/Micro Irrigation',
            value: 'Drip/Micro Irrigation',
          },
        ],
        hookFormRegister: irrigationTypeRegister,
        onChange: irrigationTypeChangeHandler,
        disabled: store.selected_service,
        name: IRRIGATIONTYPE,
        errors: errors[IRRIGATIONTYPE]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.HAS_FARMING_TOOLS'),
        type: 'options',
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'Limited',
            value: 'Limited',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
        hookFormRegister: hasFarmingToolsRegister,
        onChange: hasFarmingToolsChangeHandler,
        disabled: store.selected_service,
        name: HASFARMINGTOOLS,
        errors: errors[HASFARMINGTOOLS]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.HAS_POWER_SUPPLY'),
        type: 'options',
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'Limited',
            value: 'Limited',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
        hookFormRegister: hasPowerSupplyRegister,
        onChange: hasPowerSupplyChangeHandler,
        disabled: store.selected_service,
        name: HASPOWERSUPPLY,
        errors: errors[HASPOWERSUPPLY]?.message,
      },
    
    ];
    return farmServiceInputs;
  };
  
  const registerToolFormFields = () => {
    const toolTypeRegister = register(TOOLTYPE, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.TOOL_TYPE_IS_REQUIRED') },
    });
    const toolAgeRegister = register(TOOLAGE, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.TOOL_AGE_IS_REQUIRED') },
    });
    const toolPowerSourceRegister = register(TOOLPOWER, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.TOOL_POWER_IS_REQUIRED') },
    });
    const toolServingDistRegister = register(TOOLSERVINGDIST, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.TOOL_SERV_DIST_IS_REQUIRED') },
    });
    const quantityRegister = register(QUANTITY, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.QUANTITY_IS_REQUIRED') },
    });
    const toolsServiceInputs = [
      
      {
        label: t('STORE_SERVICE_SETUP.FARM_TOOL_TYPE'),
        type: 'options',
        options: [
          {
            label: 'Farming Vehicles - Tractors',
            value: 'Farming Vehicles - Tractors',
          },
          {
            label: 'Farming Vehicles - Combine or Harvester',
            value: 'Farming Vehicles - Combine or Harvester',
          },
          {
            label: 'Farming Vehicles - ATV or UTV',
            value: 'Farming Vehicles - ATV or UTV',
          },
          {
            label: 'Tractor Attachments - Plows',
            value: 'Tractor Attachments - Plows',
          },
          {
            label: 'Tractor Attachments - Harrows',
            value: 'Tractor Attachments - Harrows',
          },
          {
            label: 'Tractor Attachments - Fertilizer Spreaders',
            value: 'Tractor Attachments - Fertilizer Spreaders',
          },
          {
            label: 'Tractor Attachments - Seeders',
            value: 'Tractor Attachments - Seeders',
          },
          {
            label: 'Tractor Attachments - Balers',
            value: 'Tractor Attachments - Balers',
          },
          {
            label: 'Tractor Attachments - Wagons or Trailers',
            value: 'Tractor Attachments - Wagons or Trailers',
          },
          {
            label: 'Farming Accessories - Shovel/Axe/Fork/Rake/Saw/etc',
            value: 'Farming Accessories - Shovel/Axe/Fork/Rake/Saw/etc',
          },
        ],
        hookFormRegister: toolTypeRegister,
        onChange: toolTypeChangeHandler,
        disabled: store.selected_service,
        name: TOOLTYPE,
        errors: errors[TOOLTYPE]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.FARM_TOOL_AGE'),
        type: 'options',
        options: [
          {
            label: '0-2 Years',
            value: '0-2 Years',
          },
          {
            label: '2-5 Years',
            value: '2-5 Years',
          },
          {
            label: '10+ years',
            value: '10+ years',
          },
        ],
        hookFormRegister: toolAgeRegister,
        onChange: toolAgeChangeHandler,
        disabled: store.selected_service,
        name: TOOLAGE,
        errors: errors[TOOLAGE]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.FARM_TOOL_POWER'),
        type: 'options',
        options: [
          {
            label: 'Diesel',
            value: 'Diesel',
          },
          {
            label: 'Battery',
            value: 'Battery',
          },
          {
            label: 'Electric',
            value: 'Electric',
          },
          {
            label: 'Manual',
            value: 'Manual',
          },
        ],
        hookFormRegister: toolPowerSourceRegister,
        onChange: toolPowerChangeHandler,
        disabled: store.selected_service,
        name: TOOLPOWER,
        errors: errors[TOOLPOWER]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.FARM_TOOL_SERVING_DIST'),
        type: 'options',
        options: [
          {
            label: '0-5 Miles',
            value: '0-5 Miles',
          },
          {
            label: '0-10 Miles',
            value: '0-10 Miles',
          },
          {
            label: '0-50 Miles',
            value: '0-50 Miles',
          },
          {
            label: 'Anywhere',
            value: 'Anywhere',
          },
        ],
        hookFormRegister: toolServingDistRegister,
        onChange: toolServingDistChangeHandler,
        disabled: store.selected_service,
        name: TOOLSERVINGDIST,
        errors: errors[TOOLSERVINGDIST]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.QUANTITY'),
        hookFormRegister: quantityRegister,
        onChange: updateQuantity,
        disabled: store.selected_service,
        name: QUANTITY,
        type: 'number',
        errors: errors[QUANTITY]?.message,
      },
    ];
    return toolsServiceInputs;
  };
  
  const registerManpowerFormFields = () => {
    const laborTypeRegister = register(LABORTYPE, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.LABOR_TYPE_IS_REQUIRED') },
    });
    const laborWorkingHoursRegister = register(WORKINGHOURS, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.WORKING_HOURS_IS_REQUIRED') },
    });
    const laborHasFarmToolExpRegister = register(LABOREXP, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.HAS_FARM_TOOL_EXP_IS_REQUIRED') },
    });
    const laborWorkingDistanceRegister = register(LABORSERVINGDISTANCE, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.LABOR_SERVING_DIST_IS_REQUIRED') },
    });
    const quantityRegister = register(QUANTITY, {
      required: { value: true, message: t('STORE_SERVICE_SETUP.QUANTITY_IS_REQUIRED') },
    });
    const manpowerServiceInputs = [
      {
        label: t('STORE_SERVICE_SETUP.LABOR_TYPE'),
        type: 'options',
        options: [
          {
            label: 'Seeding Expert',
            value: 'Seeding Expert',
          },
          {
            label: 'Tilling Expert',
            value: 'Tilling Expert',
          },
          {
            label: 'Harvesting Experts',
            value: 'Harvesting Experts',
          },
          {
            label: 'Mechanized Farming Expert',
            value: 'Mechanized Farming Expert',
          },
          {
            label: 'Mechanized Farming Expert',
            value: 'Mechanized Farming Expert',
          },
          {
            label: 'Manual Labor',
            value: 'Manual Labor',
          },
        ],
        hookFormRegister: laborTypeRegister,
        onChange: laborTypeChangeHandler,
        disabled: store.selected_service,
        name: LABORTYPE,
        errors: errors[LABORTYPE]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.LABOR_TOOL_EXP'),
        type: 'options',
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'Limited',
            value: 'Limited',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
        hookFormRegister: laborHasFarmToolExpRegister,
        onChange: laborExpChangeHandler,
        disabled: store.selected_service,
        name: LABOREXP,
        errors: errors[LABOREXP]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.WORKING_HOURS'),
        type: 'options',
        options: [
          {
            label: '07:00 - 15:00',
            value: '07:00 - 15:00',
          },
          {
            label: '11:00 - 19:00',
            value: '11:00 - 19:00',
          },
          {
            label: '07:00 - 13:00',
            value: '07:00 - 13:00',
          },
          {
            label: '11:00 - 15:00',
            value: '11:00 - 15:00',
          },
        ],
        hookFormRegister: laborWorkingHoursRegister,
        onChange: laborWorkingHoursChangeHandler,
        disabled: store.selected_service,
        name: WORKINGHOURS,
        errors: errors[WORKINGHOURS]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.LABOR_SERVING_DIST'),
        type: 'options',
        options: [
          {
            label: '0-5 Miles',
            value: '0-5 Miles',
          },
          {
            label: '0-10 Miles',
            value: '0-10 Miles',
          },
          {
            label: '0-50 Miles',
            value: '0-50 Miles',
          },
          {
            label: 'Anywhere',
            value: 'Anywhere',
          },
        ],
        hookFormRegister: laborWorkingDistanceRegister,
        onChange: laborServingDistanceChangeHandler,
        disabled: store.selected_service,
        name: LABORSERVINGDISTANCE,
        errors: errors[LABORSERVINGDISTANCE]?.message,
      },
      {
        label: t('STORE_SERVICE_SETUP.QUANTITY'),
        hookFormRegister: quantityRegister,
        onChange: updateQuantity,
        name: QUANTITY,
        disabled: store.selected_service,
        type: 'number',
        errors: errors[QUANTITY]?.message,
      },
    ];
    return manpowerServiceInputs;
  };
  useEffect(() => {
    registerBasicFormFields();
    if(!store.service_store_id) {
      dispatch(getFarmStores());
    }
    if(store.selected_service) {
      const value = store.selected_service[SERVICETYPE];
      setValue(SERVICETYPE, value);
      const { preFixedInputs, postFixedInputs } = registerBasicFormFields();
      if(value === 'grow-farm-service') {
        const farmServiceInputs = registerFarmFormFields();
        setInputs([...preFixedInputs, ...farmServiceInputs, ...postFixedInputs]);
      } else if(value === 'grow-tool-service') {
        const farmToolServiceInputs = registerToolFormFields();
        setInputs([...preFixedInputs, ...farmToolServiceInputs, ...postFixedInputs]);
      } else if(value === 'grow-manpower-service') {
        const manpowerServiceInputs = registerManpowerFormFields();
        setInputs([...preFixedInputs, ...manpowerServiceInputs, ...postFixedInputs]);
      }
      const imgObjs = JSON.parse(store.selected_service.imageSrc);
      if(store.selected_service[_.camelCase(FARMAREA)]) {
        const farmAreaObj = JSON.parse(store.selected_service[_.camelCase(FARMAREA)]);
        setValue(FARMAREA, farmAreaObj);
      }
      setTimeout(() => {
        setStoreImages([..._.map(imgObjs, imgObj => imgObj.src)]);
        setValue(IMG_URLS, [..._.map(imgObjs, imgObj => imgObj.src)]);
        setValue(PRODNAME, store.selected_service.title);
        [
          QUANTITY,
          SKU,
          PRICE,
          LANDAREA,
          PRODDESC,
          ORGANICSTATUS,
          MINDAYS,
          MAXDAYS,
          STARTDATE,
          PRODDESC,
          SOILTYPE,
          IRRIGATIONTYPE,
          HASFARMINGTOOLS,
          HASPOWERSUPPLY,
          TOOLTYPE,
          TOOLPOWER,
          TOOLAGE,
          TOOLSERVINGDIST,
          LABORTYPE,
          LABORSERVINGDISTANCE,
          WORKINGHOURS,
          LABOREXP,
        ].map(key => {
          if(store.selected_service[_.camelCase(key)]) setValue(key, store.selected_service[_.camelCase(key)]);
        });
      }, 150);
      
    }
  }, [store]);
  
  let defaultOption;
  const SERVICETYPE = 'type';
  const STARTDATE = 'service_start_date';
  const FARMAREA = 'farm_area';
  const LANDAREA = 'land_area';
  const ORGANICSTATUS = 'organic_status';
  const SOILTYPE = 'soil_type';
  const MINDAYS = 'minimum_days';
  const MAXDAYS = 'maximum_days';
  const IRRIGATIONTYPE = 'irrigation_type';
  const HASFARMINGTOOLS = 'has_farming_tools';
  const HASPOWERSUPPLY = 'has_power_supply';
  const TOOLTYPE = 'tool_type';
  const TOOLAGE = 'tool_age';
  const TOOLPOWER = 'tool_power';
  const TOOLSERVINGDIST = 'tool_serving_distance';
  const QUANTITY = 'quantity';
  const PRICE = 'price';
  const SKU = 'sku';
  const IMG_URLS = 'img_urls';
  const PRODDESC = 'description';
  const PRODNAME = 'title';
  const LABORTYPE = 'labor_type';
  const WORKINGHOURS = 'labor_working_hours';
  const LABOREXP = 'labor_exp';
  const LABORSERVINGDISTANCE = 'labor_serving_distance';
  
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: pick(store.selected_service, [
      LANDAREA,
      ORGANICSTATUS,
      MINDAYS,
      STARTDATE,
      SKU,
      PRICE,
      PRODDESC,
      FARMAREA,
      SOILTYPE,
      IRRIGATIONTYPE,
      HASFARMINGTOOLS,
      HASPOWERSUPPLY,
      IMG_URLS,
      TOOLTYPE,
      TOOLPOWER,
      TOOLAGE,
      TOOLSERVINGDIST,
      LABORTYPE,
      LABORSERVINGDISTANCE,
      WORKINGHOURS,
      LABOREXP,
    ]),
  });
  
  const updatePrice = (change) => {
    if(!change) return;
    setValue(PRICE, change.target.value * 1);
  };
  const updateQuantity = (change) => {
    if(!change) return;
    setValue(QUANTITY, change.target.value * 1);
  };
  const updateDesc = (change) => {
    if(!change) return;
    const desc = change.target.value;
    setValue(PRODDESC, desc);
    setValue(SKU, Math.floor(Math.random() * 100000000) + 1);
  };
  
  const updateProdName = (change) => {
    if(!change) return;
    const desc = change.target.value;
    setValue(PRODNAME, desc);
    
  };
  
  const serviceTypeChangeHandler = (change) => {
    const { value } = change;
    reset();
    setStoreImages([]);
    setValue(SERVICETYPE, value);
    const { preFixedInputs, postFixedInputs } = registerBasicFormFields();
    if(value === 'grow-farm-service') {
      const farmServiceInputs = registerFarmFormFields();
      setInputs([...preFixedInputs, ...farmServiceInputs, ...postFixedInputs]);
    } else if(value === 'grow-tool-service') {
      const farmToolServiceInputs = registerToolFormFields();
      setInputs([...preFixedInputs, ...farmToolServiceInputs, ...postFixedInputs]);
    } else if(value === 'grow-manpower-service') {
      const manpowerServiceInputs = registerManpowerFormFields();
      setInputs([...preFixedInputs, ...manpowerServiceInputs, ...postFixedInputs]);
    }
  };
  
  const farmAreaChangeHandler = (change) => {
    const { value } = change;
    const field = _.find(fields, { figure_id: value });
    const { grid_points, figure_id, name } = field;
    const landInfo = { grid_points, figure_id, name };
    setValue(FARMAREA, landInfo);
    setValue(ORGANICSTATUS, field.organic_status);
    setValue(LANDAREA, `${field.total_area} ${units[field.total_area_unit]}`);
  };
  
  const soilTypeChangeHandler = (change) => {
    const { value } = change;
    setValue(SOILTYPE, value);
  };
  const laborTypeChangeHandler = (change) => {
    const { value } = change;
    setValue(LABORTYPE, value);
  };
  const laborExpChangeHandler = (change) => {
    const { value } = change;
    setValue(LABOREXP, value);
  };
  const laborWorkingHoursChangeHandler = (change) => {
    const { value } = change;
    setValue(WORKINGHOURS, value);
  };
  const laborServingDistanceChangeHandler = (change) => {
    const { value } = change;
    setValue(LABORSERVINGDISTANCE, value);
  };
  const irrigationTypeChangeHandler = (change) => {
    const { value } = change;
    setValue(IRRIGATIONTYPE, value);
  };
  
  const hasPowerSupplyChangeHandler = (change) => {
    const { value } = change;
    setValue(HASPOWERSUPPLY, value);
  };
  
  const hasFarmingToolsChangeHandler = (change) => {
    const { value } = change;
    setValue(HASFARMINGTOOLS, value);
  };
  
  const minDaysChangeHandler = (change) => {
    const { value } = change;
    setValue(MINDAYS, value);
  };
  const maxDaysChangeHandler = (change) => {
    const { value } = change;
    setValue(MAXDAYS, value);
  };
  
  const toolTypeChangeHandler = (change) => {
    const { value } = change;
    setValue(TOOLTYPE, value);
  };
  
  const toolAgeChangeHandler = (change) => {
    const { value } = change;
    setValue(TOOLAGE, value);
  };
  const toolPowerChangeHandler = (change) => {
    const { value } = change;
    setValue(TOOLPOWER, value);
  };
  const toolServingDistChangeHandler = (change) => {
    const { value } = change;
    setValue(TOOLSERVINGDIST, value);
  };
  
  const imageUploaded = (url) => {
    setStoreImages([...storeImages, url]);
    setValue(IMG_URLS, [...storeImages, url], { shouldValidate: true });
  };
  const onSubmit = (data) => {
    data.store_name = store.store_name;
    if(store.selected_service) {
      data.variantId = store.selected_service.variantId;
      data.productId = store.selected_service.productId;
      dispatch(updateStoreProduct(data));
    } else {
      dispatch(createStoreService(data));
    }
    
  };
  return (
    !store.loading ? <Card>
      <CardHeader title={t('STORE_SERVICE_SETUP.SETUP')}>
      </CardHeader>
      <CardContent>
        <PageTitle title={''} onGoBack={() => {history.push('/service_front');}} />
        <Form
          data-cy='addStoreService-form'
          onSubmit={handleSubmit(onSubmit)}
          
          buttonGroup={
            <Button
              data-cy='addStoreService-continue'
              type={'submit'}
              disabled={!isValid}
              fullLength
            >
              {t('common:CONTINUE')}
            </Button>
          }
        >
          <div style={{ marginBottom: 20 }}>
            <Select
              onChange={serviceTypeChangeHandler}
              data-cy='store-service-select'
              placeholder={t('STORE_SERVICE_SETUP.SELECT_SERVICE')}
              isDisabled={store.selected_service}
              isSearchable={false}
              options={serviceTypes}
              defaultValue={store.selected_service ? _.find(serviceTypes, { value: store.selected_service.type }) : {}}
            />
          </div>
          {_.map(inputs, input => {
            if(input.type === 'text' || input.type === 'number' || input.type === 'date') {
              return (<Input key={input.name} data-cy='addStoreFront-farmName' style={style} {...input} />);
            }
            if(input.type === 'options') {
              let farmAreaObj;
              if(store.selected_service && store.selected_service[_.camelCase(FARMAREA)] && input.name === FARMAREA) {
                farmAreaObj = JSON.parse(store.selected_service[_.camelCase(FARMAREA)]);
              }
              return (
                <div style={{ marginBottom: 20 }}>
                  <label>{input.label}</label>
                  <Select
                    key={input.name}
                    onChange={input.onChange}
                    data-cy='store-service-select'
                    placeholder={input.label}
                    isDisabled={input.disabled}
                    isSearchable={false}
                    options={input.options}
                    defaultValue={store.selected_service && input.name !== FARMAREA ? _.find(input.options,
                        { value: store.selected_service[_.camelCase(input.name)] })
                      : (farmAreaObj ? _.find(input.options,
                        { value: farmAreaObj['figure_id'] }) : {})}
                  />
                </div>
              );
            }
            
          })}
          <Carousel className={clsx(storeStyles.carouselRoot)} width={'80%'} autoPlay={false} showArrows={true}>
            {_.map(storeImages, (image, index) => (
                <div key={index}>
                  <img src={image} />
                  <p style={legendStyle} className='legend'>{`Image ${index + 1}`}</p>
                </div>
              ),
            )}
          </Carousel>
          {imageLoading && <Spinner />}
          <StoreImagePickerWrapper onSuccess={imageUploaded} onLoading={setImageLoading}>
            <AddLink>{t('STORE_SERVICE_SETUP.IMAGE_SET')}</AddLink>
          </StoreImagePickerWrapper>
        </Form>
      </CardContent>
    </Card> : <CircularProgress size={55} style={{ margin: 'auto', alignSelf: 'center' }} />
  );
};
export default ServiceSetup;

