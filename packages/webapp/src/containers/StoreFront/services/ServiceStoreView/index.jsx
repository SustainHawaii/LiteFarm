import React from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import history from '../../../../history';
import styles from '../../../../components/ChooseFarm/ChooseFarmMenu/ChooseFarmMenuItem/chooseFarmMenuItem.module.scss';
import Card from '../../../../components/Card';
import { CardContent, CardHeader, Typography } from '@material-ui/core';
import Button from '../../../../components/Form/Button';
import Layout from '../../../../components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { createStripeAccount, viewStripeAccount } from '../../saga';
import { storeServiceEdit } from '../../../storeFrontSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    padding: '12px',
    position: 'relative',
    flexDirection: 'column',
    rowGap: '16px',
  },
  semibold: {
    fontWeight: 600,
  },
  secondRowContainer: {
    display: 'flex',
    gap: '10px',
  },
  cropCountContainer: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
});

const ServiceStoreView = ({
  store,
  setSetup,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleEdit = (productDetails) => {
    dispatch(storeServiceEdit(productDetails));
    history.push('/store_services');
  };
  
  return (
    <Layout
      hasWhiteBackground
      classes={{ footer: { position: 'fixed', maxWidth: '1024px' } }}
      buttonGroup={
        <>
          <Button fullLength onClick={() => dispatch(createStripeAccount())}>
            {t('ADD_STORE_FRONT.PAYMENT_SETUP')}
          </Button>
          {store.stripe_account_id &&
          <Button data-cy='chooseFarm-proceed' fullLength onClick={() => dispatch(viewStripeAccount())}>
            {t('ADD_STORE_FRONT.PAYMENT_DETAILS')}
          </Button>
          }
        </>
      }
    >
      <Card>
        <CardHeader title={'Service Store Details'} />
        <div style={{ marginRight: 20, textAlign: '-webkit-right' }}>
          <Button color={'success'} onClick={() => setSetup(true)}>
            {t('STORE_PRODUCT_SETUP.MORE')}
          </Button>
        </div>
        <CardContent style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '63px',
          justifyContent: 'space-between',
          cursor: 'pointer',
          wordBreak: 'break-word',
          padding: '8px 0',
          marginTop: 1,
          marginBottom: 10,
        }}
        >
          <img src={store.img_src} width={100} style={{ padding: 15 }} />
          <div className={clsx(styles.leftColumn, styles['primary'])}>
            
            <h5 className={clsx(styles.farmName)}>
              {store.store_name}
            </h5>
            {store.store_desc && <p className={clsx(styles.address)}>{store.store_desc}</p>}
          </div>
          <div className={clsx(styles.rightColumn, styles['primary'])}>
            
            <div className={styles.addressContainer}>
              <p className={clsx(styles.address)}>
                <Typography variant={'h6'}>Store Address</Typography>
                {store.address}
              </p>
            </div>
          
          </div>
        </CardContent>
      </Card>
      <Card style={{ marginTop: 20 }}>
        <CardHeader title={'Listed Services'} />
        <div style={{ marginRight: 20, textAlign: '-webkit-right' }}>
          <Button color={'success'} onClick={() => handleEdit()}>
            {t('STORE_PRODUCT_SETUP.ADD')}
          </Button>
        </div>
        <CardContent style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: '63px',
          overflowX: 'auto',
          justifyContent: 'space-between',
          cursor: 'pointer',
          wordBreak: 'break-word',
          padding: '8px 0',
          marginTop: 1,
          marginBottom: 10,
        }}
        >
          {_.map(_.filter(store.products, (product) => product.type.indexOf('service') >= 0), (storeProducts) => (
            <Card key={storeProducts.productId}
                  onClick={() => handleEdit(storeProducts)} style={{
              minHeight: 200,
              maxWidth: 200,
              minWidth: 200,
              justifyContent: 'space-between',
              cursor: 'pointer',
              wordBreak: 'break-word',
              padding: '8px 0',
              marginTop: 1,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
            }}>
              <p>
                <img
                  src={_.first(JSON.parse(storeProducts.imageSrc)).src}
                  width={100}
                  height={100}
                  style={{ marginLeft: 50, marginTop: 10 }} />
              </p>
              <p style={{ textAlign: 'center', padding: 5 }}>
                <h5 className={clsx(styles.farmName)}>
                  {storeProducts.title}
                </h5>
              </p>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ServiceStoreView;

