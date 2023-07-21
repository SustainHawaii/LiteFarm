import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import history from '../../../history';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { pick } from '../../../util/pick';
import { CardContent, CardHeader, CircularProgress, TextField, Typography } from '@material-ui/core';
import Card from '../../../components/Card';
import Select from 'react-select';
import useReactSelectStyles from '../../../components/Form/Unit/useReactSelectStyles';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Form/Button';
import Form from '../../../components/Form';
import {
  createStoreProduct,
  getFarmStores,
  searchFood,
  updateStoreProduct,
} from '../../StoreFront/saga';
import PageTitle from '../../../components/PageTitle/v2';
import { storeProductEdit } from '../../storeFrontSlice';

const PROD_DESC_HTML_TEMPLATE = '__DESC__<br><b>country of origin :  </b>united states<br><b>size :  </b>1 bag<br><b>pack of : </b>__WEIGHT__ __UNIT__<br><b>selling unit : </b>__WEIGHT__ __UNIT__<br><b>keywords : </b>farm produce;natural';

const ONLINE_SALES_HARVEST_USE_TYPE_ID = 13;
const style = {
  marginBottom: '28px',
};
const ProductSetup = ({
  store,
  tasks,
  user,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { farm_id } = user;
  const [cropPhotoUrl, setCropPhotoUrl] = useState();
  const [cropWeightUnit, setCropWeightUnit] = useState(1);
  const [cropProductName, setCropProductName] = useState();
  const [searching, setSearching] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  
  useEffect(() => {
    if(!store.store_id) {
      dispatch(getFarmStores());
    }
    if(store.selected_product) {
      setCropPhotoUrl(store.selected_product.imageSrc);
      setValue(CROPNAME, store.selected_product.crop_common_name);
      setValue(PRODUCTNAME, store.selected_product.title);
      setValue(CROPKEY, store.selected_product.crop_key);
      setCropProductName(store.selected_product.title);
      setCropWeightUnit(store.selected_product.weight);
      [FDCID, DESC, AVAILABLE, WEIGHT, QUANTITY, SKU, PRICE, UNIT, FDCID].map(key => {
        if(key === FDCID) {
          setValue(key, store.selected_product['fdcId'])
        }else {
          setValue(key, store.selected_product[key])
        }
        
      })
      updateDesc();
    }
  }, [store]);
  
  useEffect(() => {
    const labelMapper = {};
    const foodOptions = _.filter(foodItems, item => item.dataType !== 'Branded').map(food => {
      const { fdcId, description, brandOwner, brandName, foodCategory, dataType } = food;
      const label = dataType === 'Branded' ? `${description} - ${foodCategory} - ${brandOwner}` : description;
      let entryCount = 1;
      if(labelMapper[label]) {
        entryCount = 2;
      } else {
        labelMapper[label] = 1;
      }
      return {
        id: fdcId,
        label,
        entryCount,
      };
    }).filter(entry => entry.entryCount === 1);
    setOptions(foodOptions);
    setLoading(false);
  }, [foodItems]);
  
  const neededData = _.map(_.filter(tasks, (task) => {
    if(!task.harvest_task || (task.assignee && task.assignee.farm_id !== farm_id)) return false;
    const harvestUse = _.filter(task.harvest_task.harvest_use,
      { harvest_use_type_id: ONLINE_SALES_HARVEST_USE_TYPE_ID });
    return harvestUse.length > 0;
  }), (neededTask) => {
    const { crop_common_name, hs_code_id, fdc_id, crop_photo_url , harvest_date } = _.first(neededTask.managementPlans);
    const { quantity, quantity_unit } = _.find(neededTask.harvest_task.harvest_use,
      { harvest_use_type_id: ONLINE_SALES_HARVEST_USE_TYPE_ID });
    return {
      complete_date: neededTask.complete_date,
      crop_common_name,
      crop_photo_url,
      hs_code_id,
      quantity,
      fdc_id,
      quantity_unit,
      harvest_date,
      key : `${crop_common_name}__${harvest_date}`
    };
  });
  
  const selectOptions = _.map(neededData, data => {
    return {
      value: `${data.key}`,
      label: `${data.crop_common_name} harvested on ${data.harvest_date.split('T')[0]}`,
    };
  });
  let defaultOption;
  if(store.selected_product) {
    defaultOption = _.find(selectOptions,
      { value: store.selected_product.crop_key });
  }
  const CROPNAME = 'crop_common_name';
  const PRODUCTNAME = 'product_name';
  const CROPKEY = 'crop_key'
  const FDCID = 'fdc_id';
  const AVAILABLE = 'harvest_weight';
  const WEIGHT = 'weight';
  const QUANTITY = 'quantity';
  const UNIT = 'weight_unit';
  const PRICE = 'price';
  const SKU = 'sku';
  const IMG_URL = 'img_url';
  const DESC = 'display_description';
  const PRODDESC = 'description';
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: pick(store.selected_product, [CROPKEY, FDCID, DESC, AVAILABLE, CROPNAME, WEIGHT, QUANTITY, SKU, PRICE, UNIT, FDCID, PRODUCTNAME]),
  });
  
  const harvestWeightRegister = register(AVAILABLE, {
    required: { value: true },
  });
  const weightRegister = register(WEIGHT, {
    required: { value: true },
  });
  const descRegister = register(DESC, {
    required: { value: true, message: t('STORE_PRODUCT_SETUP.DESC_IS_REQUIRED') },
  });
  const fdcIdRegister = register(FDCID, {
    required: { value: true, message: t('STORE_PRODUCT_SETUP.FDC_ID_IS_REQUIRED') },
  });
  const quantityRegister = register(QUANTITY, {
    required: { value: true, message: t('STORE_PRODUCT_SETUP.QUANTITY_IS_REQUIRED') },
  });
  const unitRegister = register(UNIT, {
    required: { value: true, message: t('STORE_PRODUCT_SETUP.UNIT_IS_REQUIRED') },
  });
  const skuRegister = register(SKU, {
    required: { value: true, message: t('STORE_PRODUCT_SETUP.SKU_IS_REQUIRED') },
  });
  const priceRegister = register(PRICE, {
    required: { value: true, message: t('STORE_PRODUCT_SETUP.PRICE_IS_REQUIRED') },
  });
  
  const weightChangeHandler = (change) => {
    const weight = _.isEmpty(change.target.value) ? 1 : change.target.value * 1;
    const values = getValues();
    const available = values[AVAILABLE];
    setValue(QUANTITY, (available / weight).toFixed(0) * 1);
    setValue(WEIGHT, weight);
    setCropWeightUnit(weight)
    const productName = `${store.store_name}-${values[CROPNAME]}-Pack of ${weight}-${values[UNIT]}`;
    setValue(PRODUCTNAME, productName);
    updateDesc();
  };
  const updatePrice = (change) => {
    if(!change) return
    setValue(PRICE, change.target.value*1);
  }
  const updateDesc = (change) => {
    if(!change) return
    let html = PROD_DESC_HTML_TEMPLATE;
    const desc = change.target.value
    const values = getValues();
    html = html.replaceAll('__DESC__', desc)
      .replaceAll('__UNIT__', values[UNIT]).replaceAll('__WEIGHT__', values[WEIGHT]);
    const element = document.getElementById('__prod_description__');
    element.innerHTML = html;
    setValue(PRODDESC, html);
    
  };
  
  const cropChangeHandler = (change) => {
    const { value } = change;
    const crop = _.find(neededData, { key: value });
    const productName = `${store.store_name}-${crop.crop_common_name}-Pack of ${cropWeightUnit}-${crop.quantity_unit}`;
    setValue(CROPNAME, crop.crop_common_name);
    setValue(CROPKEY, value);
    setValue(AVAILABLE, crop.quantity);
    setValue(PRODUCTNAME, productName);
    setCropProductName(productName);
    if(cropWeightUnit > 1 ) {
      setValue(WEIGHT, cropWeightUnit);
      setValue(QUANTITY, ((crop.quantity * 1)/cropWeightUnit).toFixed(0)*1);
    }else {
      setValue(QUANTITY, (crop.quantity * 1).toFixed(0)*1);
      setValue(WEIGHT, 1);
    }
    setValue(UNIT, crop.quantity_unit);
    setValue(IMG_URL, crop.crop_photo_url);
    setCropPhotoUrl(crop.crop_photo_url);
    let product = _.find(store.products ,
      ({ storeProducts }) => storeProducts.crop_key === value )
    if(product) {
      dispatch(storeProductEdit(product.storeProducts))
    }else {
      product = _.find(store.products ,
        ({ storeProducts }) => storeProducts.crop_common_name === crop.crop_common_name )
      if(product) {
        const copyProduct = _.cloneDeep(product.storeProducts)
        copyProduct[AVAILABLE] = crop.quantity
        copyProduct[QUANTITY] = (crop.quantity/copyProduct.weight).toFixed(0)*1
        dispatch(storeProductEdit(copyProduct))
      }
    }
    updateDesc();
  };
  
  const handleSearchNew = (evt) => {
    if(!evt) return;
    const inputValue = evt.target.value;
    handleSearchChange(inputValue);
  };
  const handleChange = (evt, value) => {
    handleSearch(value);
  };
  
  const handleSearch = async (search) => {
    if(_.isEmpty(search)) return;
    setOptions([]);
    setValue(FDCID, search.id);
  };
  const handleSearchChange = async search => {
    if(_.isEmpty(search)) return;
    setLoading(true);
    dispatch(searchFood({ setFoodItems, search }));
    
  };
  const debouncedHandleSearchChange = _.debounce(handleSearchNew, 1000);
  
  const inputs = [
    {
      label: t('STORE_PRODUCT_SETUP.CROP_DESC'),
      hookFormRegister: descRegister,
      onChange: updateDesc,
      disabled: store.selected_product,
      name: DESC,
      errors: errors[DESC]?.message,
    },
    {
      label: t('STORE_PRODUCT_SETUP.HARVEST_QUANTITY'),
      hookFormRegister: harvestWeightRegister,
      name: AVAILABLE,
      disabled: true,
      errors: errors[AVAILABLE]?.message,
    },
    {
      label: t('STORE_PRODUCT_SETUP.UNIT'),
      hookFormRegister: unitRegister,
      name: UNIT,
      disabled: true,
      errors: errors[UNIT]?.message,
    },
    {
      label: t('STORE_PRODUCT_SETUP.SALE_UNIT'),
      hookFormRegister: weightRegister,
      name: WEIGHT,
      disabled: store.selected_product,
      type: 'number',
      onChange: weightChangeHandler,
      errors: errors[WEIGHT]?.message,
    },
    {
      label: t('STORE_PRODUCT_SETUP.QUANTITY'),
      hookFormRegister: quantityRegister,
      disabled: true,
      name: QUANTITY,
      errors: errors[QUANTITY]?.message,
    },
    {
      label: t('STORE_PRODUCT_SETUP.SKU'),
      hookFormRegister: skuRegister,
      name: SKU,
      disabled: store.selected_product,
      errors: errors[SKU]?.message,
    },
    {
      label: t('STORE_PRODUCT_SETUP.PRICE'),
      hookFormRegister: priceRegister,
      onChange : updatePrice,
      name: PRICE,
      type: 'number',
      errors: errors[PRICE]?.message,
    },
  ];
  if(store.selected_product) {
    inputs.push(
      {
        label: t('STORE_PRODUCT_SETUP.FDC_ID_READ'),
        hookFormRegister: fdcIdRegister,
        name: FDCID,
        disabled: true,
        errors: errors[FDCID]?.message,
      },
    )
  }
  const onSubmit = (data) => {
    data.store_name = store.store_name;
    if(store.selected_product) {
      data.variantId = store.selected_product.variantId
      data.productId = store.selected_product.productId
      dispatch(updateStoreProduct(data));
    }else {
      dispatch(createStoreProduct(data));
    }
    
  };
  return (
    !store.loading ? <Card>
      <CardHeader title={t('STORE_PRODUCT_SETUP.SETUP')}>
      </CardHeader>
      <CardContent>
        <PageTitle title={''} onGoBack={() => {history.push('/store_front');}} />
        <Form
          data-cy='addStoreProduct-form'
          onSubmit={handleSubmit(onSubmit)}
          
          buttonGroup={
            <Button
              data-cy='addStoreFront-continue'
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
              onChange={cropChangeHandler}
              data-cy='store-product-select'
              placeholder={t('STORE_PRODUCT_SETUP.SELECT_CROP')}
              isSearchable={false}
              options={selectOptions}
              defaultValue={defaultOption}
            />
            {cropPhotoUrl &&
            <div style={{ marginTop: 20, textAlign: 'center' }}><img src={cropPhotoUrl} width={100} /></div>}
          </div>
          <Typography style={{ alignSelf: 'center' }} variant={'h6'}>{cropProductName}</Typography>
          <div style={{ marginTop: 10, marginBottom: 10 }} id={'__prod_description__'}>
          
          </div>
          {!store.selected_product &&
          <Autocomplete options={options}
                        fullWidth
                        style={{ marginTop: 10, marginBottom: 20 }}
                        disabled={searching}
                        getOptionLabel={(option) => option.label}
                        onInputChange={debouncedHandleSearchChange}
                        onChange={handleChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t('STORE_PRODUCT_SETUP.FDC_ID')}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loading ? <CircularProgress color='inherit' size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
          />
          }
          {_.map(inputs, input => (
              <Input key={input.name} data-cy='addStoreFront-farmName' style={style} {...input} />
            ),
          )}
        </Form>
      </CardContent>
    </Card> : <CircularProgress size={55} style={{margin: 'auto', alignSelf : 'center'}} />
  );
};
export default ProductSetup;

