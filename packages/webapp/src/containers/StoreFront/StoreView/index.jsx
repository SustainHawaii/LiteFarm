import React from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import history from '../../../history';
import styles from '../../../components/ChooseFarm/ChooseFarmMenu/ChooseFarmMenuItem/chooseFarmMenuItem.module.scss';
import Card from '../../../components/Card';
import { CardContent, CardHeader, Typography } from '@material-ui/core';
import Button from '../../../components/Form/Button';
import Layout from '../../../components/Layout';
import Square from '../../../components/Square';
import { makeStyles } from '@material-ui/core/styles';
import { createStripeAccount, viewStripeAccount } from '../saga';
import { storeProductEdit } from '../../storeFrontSlice';

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

const StoreView = ({
  store,
  setSetup,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleEdit = (productDetails) => {
    dispatch(storeProductEdit(productDetails));
    history.push('/store_product');
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
        <CardHeader title={'Store Details'} />
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
                <Typography variant={'h6'}>Pickup Address</Typography>
                {store.address}
              </p>
            </div>
          
          </div>
        </CardContent>
      </Card>
      <Card style={{ marginTop: 20 }}>
        <CardHeader title={'Listed Products'} />
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
          {_.map(store.products, ({ storeProducts }) => (
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
                  src={storeProducts.imageSrc}
                  width={100}
                  height={100}
                  style={{ marginLeft: 50, marginTop: 10 }} />
              </p>
              <p style={{ textAlign: 'center', padding: 5 }}>
                <h5 className={clsx(styles.farmName)}>
                  {storeProducts.title}
                </h5>
              </p>
              <div className={classes.cropCountContainer}>
                <span style={{ margin: 'auto' }}>Qty : <Square>{storeProducts.quantity} </Square></span>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default StoreView;

