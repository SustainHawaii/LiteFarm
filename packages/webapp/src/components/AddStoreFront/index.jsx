import Form from '../Form';
import Button from '../Form/Button';
import Input from '../Form/Input';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import PageTitle from '../PageTitle/v2';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import EnglishOwnerConsent from '../../containers/StoreFront/locales/en/Owner.Consent.md';
import clsx from 'clsx'
import styles from '../Consent/consent.module.scss'
import storeStyles from './store.scss'
import Checkbox from '../Form/Checkbox'
import { CircularProgress, Typography } from '@material-ui/core';


const style = {
  marginBottom: '28px',
};
const legendStyle = {
  background : 'rgb(45 185 141)',
  opacity : '0.65'
}
const sliderOne = 'https://cdn.shopify.com/s/files/1/0711/5738/3442/files/farm2.jpg?v=1689424026'
const sliderTwo = 'https://cdn.shopify.com/s/files/1/0711/5738/3442/files/farm4.jpg?v=1689424025'
const sliderThree = 'https://cdn.shopify.com/s/files/1/0711/5738/3442/files/farm5.jpg?v=1689424025'
const sliderFour = 'https://cdn.shopify.com/s/files/1/0711/5738/3442/files/farm3.jpg?v=1689424025'
const sliderFive = 'https://cdn.shopify.com/s/files/1/0711/5738/3442/files/farm1.jpg?v=1689424016'


export default function PureAddStoreFront({
  title,
  inputs = [{}, {}],
  onGoBack,
  onSubmit,
  map,
  loading,
  disabled,
  step,
  setStep,
  setValue,
  register,
  watch,
  errors,
}) {
  const { t } = useTranslation(['translation', 'common']);
  const imageSet = [sliderOne,sliderTwo,sliderThree,sliderFour,sliderFive]
  const imageIndex = 0
  const checkboxName = 'consent_checkbox';
  
  const hasConsent = watch(checkboxName, false);
  const checkBoxRegister = register(checkboxName, {
    required: {
      value: step === 'third',
      message: 'You must accept terms and conditions to create a storefront',
    },
  });
  
  useEffect(() => {
    if(step === 'image') {
      setValue(inputs[step]['image_src'].name, imageSet[imageIndex])
      console.log('image set')
    }
    if(step === 'consent') {
      
      const consent = document.getElementById('consent-id')
      console.log(consent.innerText)
      setValue('consent_content', consent.innerText)
    }
  }, [step])
  const checkboxArgs={
    hookFormRegister: checkBoxRegister,
      label: t('CONSENT.LABEL'),
      errors: errors[checkboxName] && errors[checkboxName].message,
  }
  return (
    <Form
      data-cy="addStoreFront-form"
      onSubmit={onSubmit}
      buttonGroup={
        <Button
          data-cy="addStoreFront-continue"
          type={'submit'}
          disabled={disabled || loading}
          fullLength
        >
          {loading ? t('common:LOADING') : t('common:CONTINUE')}
        </Button>
      }
    >
      { step === 'name_address' && <>
        <PageTitle onGoBack={onGoBack} title={title} style={{ marginBottom: '20px' }} />
        <Input data-cy="addStoreFront-farmName" style={style} {...inputs[step].store_name} />
        <Input data-cy="addStoreFront-location" style={style} {...inputs[step].pickup_location} />
      {map}
      </>
      }
      { step === 'image' && <div style={{margin : 'auto'}}>
        <PageTitle onGoBack={onGoBack} title={title} style={{ marginBottom: '20px' }} />
        <Input data-cy="addStoreFront-storeDesc" style={style} {...inputs[step].store_desc} />
        <Typography variant={'h6'} style={{ marginBottom: '16px' }}>{inputs[step].image_src.label}</Typography>
        <Carousel className={clsx(storeStyles.carouselRoot)} width={'30%'} autoPlay={false} showArrows={true} onChange={(evt) => {
          setValue(inputs[step].image_src.name, imageSet[evt])
        }}>
          <div>
            <img src={sliderOne} />
            <p style={legendStyle} className="legend">Farm Store Image 1</p>
          </div>
          <div>
            <img src={sliderTwo}/>
            <p style={legendStyle} className="legend">Farm Store Image 2</p>
          </div>
          <div>
            <img src={sliderThree} />
            <p style={legendStyle} className="legend">Farm Store Image 3</p>
          </div>
          <div>
            <img src={sliderFour} />
            <p style={legendStyle} className="legend">Farm Store Image 4</p>
          </div>
          <div>
            <img src={sliderFive} />
            <p style={legendStyle} className="legend">Farm Store Image 5</p>
          </div>
        </Carousel>
        
      </div>
      }
      { step === 'consent' && <>
         <PageTitle
          title={t('CONSENT.DATA_POLICY')}
          onGoBack={onGoBack}
          style={{ marginBottom: '16px' }}
        />
        <div data-cy="consentPage-content" className={clsx(styles.consentTextContainer)} id={'consent-id'}>
          <EnglishOwnerConsent/>
        </div>
        <div
          style={{
            width: '100%',
            height: '38px',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255,255 , 255, 1) 55.21%)',
            marginTop: '-28px',
            zIndex: '2000',
          }}
        />
        <div>
          <Checkbox data-cy="consent-agree" style={{ marginBottom: 0 }} {...checkboxArgs} />
        </div>
      </>
      }
      { step === 'identity' && <>
        <PageTitle onGoBack={onGoBack} title={title} style={{ marginBottom: '20px' }} />
        <Input disabled data-cy="addStoreFront-firstName" style={style} {...inputs[step].first_name} />
        <Input disabled data-cy="addStoreFront-lastName" style={style} {...inputs[step].last_name} />
        <Input disabled data-cy="addStoreFront-email" style={style} {...inputs[step].email} />
        <Input disabled data-cy="addStoreFront-phone" style={style} {...inputs[step].phone} />
        <Typography variant={'body1'}>{t('ADD_STORE_FRONT.STRIPE_INFO')}</Typography>
      </>
      }
      { step === 'submission' && <>
        <PageTitle onGoBack={onGoBack} title={title} style={{ marginBottom: '20px' }} />
        <Typography variant={'body1'}>{t('ADD_STORE_FRONT.STRIPE_START')}</Typography>
        <CircularProgress size={55} style={{margin : 'auto'}}/>
      </>
      }
    </Form>
  );
}

PureAddStoreFront.prototype = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  map: PropTypes.node,
  inputs: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      info: PropTypes.string,
      icon: PropTypes.node,
    }),
  ),
};
