import { useForm } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import Script from 'react-load-script';
import _ from 'lodash';
import GoogleMap from 'google-map-react';
import { VscLocation } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import {
  userFarmReducerSelector,
} from '../../userFarmSlice';

import {
  createStoreAccount,
} from '../saga';
import { ReactComponent as MapPin } from '../../../assets/images/signUp/map_pin.svg';
import { ReactComponent as MapErrorPin } from '../../../assets/images/signUp/map_error_pin.svg';
import { ReactComponent as LoadingAnimation } from '../../../assets/images/signUp/animated_loading_farm.svg';
import { useTranslation } from 'react-i18next';
import { getLanguageFromLocalStorage } from '../../../util/getLanguageFromLocalStorage';
import { useThrottle } from '../../hooks/useThrottle';
import { pick } from '../../../util/pick';
import PureAddStoreFront from '../../../components/AddStoreFront';

const StoreSetup = ({
  store,
  user,
  setup,
  setSetup,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mainUserFarmSelector = useSelector(userFarmReducerSelector);
  const FARMNAME = 'store_name';
  const ADDRESS = 'address';
  const GRID_POINTS = 'grid_points';
  const COUNTRY = 'country';
  const IMG_SRC = 'img_src';
  const STORE_DESC = 'store_desc';
  const EMAIL = 'email';
  const PHONE = 'phone_number';
  const FIRST_NAME = 'first_name';
  const LAST_NAME = 'last_name';
  const CONSENT = 'consent_checkbox';
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: pick(store, [FARMNAME, ADDRESS, GRID_POINTS, COUNTRY, IMG_SRC, STORE_DESC]),
  });
  
  const gridPoints = watch(GRID_POINTS);
  const disabled = !isValid;
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [step, setStep] = useState('name_address');
  
  useEffect(() => {
    const { first_name, last_name, phone_number, email } = _.first(user);
    setValue(FIRST_NAME, first_name);
    setValue(LAST_NAME, last_name);
    setValue(PHONE, phone_number);
    setValue(EMAIL, email);
  }, []);
  useEffect(() => {
    if(store.redirect_url) {
      window.location.href = store.redirect_url;
    }
    if(store.store_id) {
      _.map([FARMNAME, ADDRESS, GRID_POINTS, COUNTRY, IMG_SRC, STORE_DESC, CONSENT], field => {
        if(field === GRID_POINTS) {
          setValue(field, JSON.parse(_.get(store, field)), { shouldValidate: true });
        } else {
          setValue(field, _.get(store, field), { shouldValidate: true });
        }
      });
    }
  }, [store]);
  
  const farmNameRegister = register(FARMNAME, {
    required: { value: true, message: t('ADD_STORE_FRONT.STORE_NAME_IS_REQUIRED') },
  });
  const addressRegister = register(ADDRESS, {
    required: { value: true, message: t('ADD_STORE_FRONT.ADDRESS_IS_REQUIRED') },
  });
  const descrRegister = register(STORE_DESC, {
    required: { value: step === 'second', message: t('ADD_STORE_FRONT.DESCRIPTION_IS_REQUIRED') },
  });
  const imageRegister = register(IMG_SRC, {
    required: { value: step === 'second', message: t('ADD_STORE_FRONT.IMAGE_IS_REQUIRED') },
  });
  const emailRegister = register(EMAIL, {
    required: { value: step === 'fourth' },
  });
  const phoneRegister = register(PHONE, {
    required: { value: step === 'fourth' },
  });
  const firstNameRegister = register(FIRST_NAME, {
    required: { value: step === 'fourth' },
  });
  const lastNameRegister = register(LAST_NAME, {
    required: false,
  });
  
  const errorMessage = {
    geolocationDisabled: t('ADD_STORE_FRONT.DISABLE_GEO_LOCATION'),
  };
  
  const addressErrors =
    errors[ADDRESS]?.message ||
    errors[GRID_POINTS]?.message ||
    errors[COUNTRY]?.message ||
    errorMessage[errors[ADDRESS]?.type];
  
  const onSubmit = (data) => {
    if(step === 'name_address') {
      const nStep = 'image';
      setStep(nStep);
      return;
    }
    if(step === 'image') {
      const nStep = 'consent';
      setStep(nStep);
      return;
    }
    if(step === 'consent') {
      const nStep = 'identity';
      setStep(nStep);
      return;
    }
    if(step === 'identity') {
      const nStep = 'submission';
      setStep(nStep);
      if(setup) {
        setSetup(false)
        return;
      }
      dispatch(createStoreAccount(data));
    }
  };
  
  const placesAutocompleteRef = useRef();
  const handleScriptLoad = () => {
    const options = {
      types: ['address'],
      language: getLanguageFromLocalStorage(),
    };
    
    // Initialize Google Autocomplete
    placesAutocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );
    
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    placesAutocompleteRef.current.setFields(['geometry', 'formatted_address', 'address_component']);
    
    // Fire Event when a suggested name is selected
    placesAutocompleteRef.current.addListener('place_changed', handlePlaceChanged);
  };
  
  const geocoderRef = useRef();
  const geocoderTimeout = useThrottle();
  const setCountryFromLatLng = (latlng, callback) => {
    const { lat, lng } = latlng;
    if(!geocoderRef.current) {
      geocoderRef.current = new google.maps.Geocoder();
    }
    geocoderTimeout(
      () =>
        geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
          let country;
          status === 'OK' &&
          results.find((place) =>
            place?.address_components?.find((component) => {
              if(component?.types?.includes?.('country')) {
                country = component.long_name;
                return true;
              }
              return false;
            }),
          );
          setValue(GRID_POINTS, { lat, lng }, { shouldValidate: true });
          setValue(COUNTRY, country, { shouldValidate: true });
          callback?.();
        }),
      isGettingLocation ? 0 : 500,
    );
  };
  
  const parseLatLng = (latLngString) => {
    const coordRegex = /^(-?\d+(?:\.\d+)?)[,\s]\s*(-?\d+(\.\d+)?)$/;
    const matches = coordRegex.exec(latLngString);
    if(!matches) return null;
    
    const result = { lat: parseFloat(matches[1]), lng: parseFloat(matches[2]) };
    return Number.isNaN(result.lat) ||
    Number.isNaN(result.lng) ||
    result.lat < -90 ||
    result.lat > 90 ||
    result.lng < -180 ||
    result.lng > 180
      ? null
      : result;
  };
  
  const handleAddressChange = (e) => {
    const latlng = parseLatLng(e.target.value);
    if(latlng) {
      setCountryFromLatLng(latlng);
    } else {
      /**
       * GOOGLE MAP listener handlePlaceChanged is delayed, so gridPoints and country will be cleared before handlePlaceChanged is called.
       * Since forced validation is delayed by 100ms, clearing GRID_POINTS and COUNTRY would not trigger error before handlePlaceChanged is called.
       */
      setValue(GRID_POINTS, undefined);
      setValue(COUNTRY, undefined);
    }
  };
  
  const handleAddressBlur = () => {
    setTimeout(() => {
      trigger([GRID_POINTS, COUNTRY]);
    }, 100);
  };
  
  const handlePlaceChanged = () => {
    const place = placesAutocompleteRef.current.getPlace();
    if(place?.geometry?.location) {
      const countryLookup = place.address_components.find((component) =>
        component.types.includes('country'),
      )?.long_name;
      
      setValue(
        GRID_POINTS,
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        { shouldValidate: true },
      );
      setValue(COUNTRY, countryLookup, { shouldValidate: true });
      setValue(ADDRESS, place.formatted_address, { shouldValidate: true });
    }
  };
  
  const handleGetGeoError = () => {
    setIsGettingLocation(false);
    setError(ADDRESS, {
      type: 'geolocationDisabled',
    });
  };
  
  const getGeoOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 10000,
  };
  
  const handleGetGeoSuccess = (position) => {
    
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    setValue(ADDRESS, `${lat}, ${lng}`, { shouldValidate: true });
    setCountryFromLatLng({ lat, lng }, () => {
      setIsGettingLocation(false);
    });
  };
  
  const getGeoLocation = () => {
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(handleGetGeoSuccess, handleGetGeoError, getGeoOptions);
  };
  return (
    <>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }&libraries=places,drawing,geometry&language=en-US`}
        onLoad={handleScriptLoad}
      />
      <PureAddStoreFront
        onGoBack={()=>{ setSetup(false); setStep('name_address')}}
        onSubmit={handleSubmit(onSubmit)}
        title={t('ADD_STORE_FRONT.TELL_US_ABOUT_YOUR_STORE')}
        disabled={disabled}
        setValue={setValue}
        register={register}
        watch={watch}
        step={step}
        setStep={setStep}
        errors={errors}
        loading={mainUserFarmSelector.loading}
        inputs={{
          name_address: {
            store_name: {
              label: t('ADD_STORE_FRONT.STORE_NAME'),
              hookFormRegister: farmNameRegister,
              name: FARMNAME,
              errors: errors[FARMNAME]?.message,
            },
            pickup_location: {
              label: t('ADD_STORE_FRONT.STORE_PICK_UP_LOCATION'),
              placeholder: t('ADD_STORE_FRONT.ENTER_LOCATION_PLACEHOLDER'),
              info: t('ADD_STORE_FRONT.STORE_PICK_UP_LOCATION_INPUT_INFO'),
              icon: isGettingLocation ? (
                <span>{t('ADD_STORE_FRONT.LOCATING')}</span>
              ) : (
                <VscLocation data-cy='addStoreFront-mapPin' size={27} onClick={getGeoLocation} />
              ),
              hookFormRegister: addressRegister,
              id: 'autocomplete',
              name: ADDRESS,
              errors: addressErrors,
              onBlur: handleAddressBlur,
              onChange: handleAddressChange,
            },
          },
          image: {
            image_src: {
              label: t('ADD_STORE_FRONT.IMAGE'),
              hookFormRegister: imageRegister,
              name: IMG_SRC,
              errors: errors[IMG_SRC]?.message,
            },
            store_desc: {
              label: t('ADD_STORE_FRONT.STORE_DESCR'),
              hookFormRegister: descrRegister,
              name: STORE_DESC,
              errors: errors[STORE_DESC]?.message,
            },
          },
          identity: {
            first_name: {
              label: t('ADD_STORE_FRONT.FIRST_NAME'),
              hookFormRegister: firstNameRegister,
              name: FIRST_NAME,
              errors: errors[FIRST_NAME]?.message,
            },
            last_name: {
              label: t('ADD_STORE_FRONT.LAST_NAME'),
              hookFormRegister: lastNameRegister,
              name: LAST_NAME,
              errors: errors[LAST_NAME]?.message,
            },
            email: {
              label: t('ADD_STORE_FRONT.EMAIL'),
              hookFormRegister: emailRegister,
              name: EMAIL,
              errors: errors[EMAIL]?.message,
            },
            phone: {
              label: t('ADD_STORE_FRONT.PHONE'),
              hookFormRegister: phoneRegister,
              name: PHONE,
              errors: errors[PHONE]?.message,
            },
          },
        }}
        map={
          <Map
            gridPoints={gridPoints || {}}
            isGettingLocation={isGettingLocation}
            errors={addressErrors}
          />
        }
      />
    </>
  );
};

function Map({ gridPoints, errors, isGettingLocation }) {
  return (
    <div
      style={{
        width: '100vw',
        maxWidth: '1024px',
        minHeight: '152px',
        flexGrow: 1,
        position: 'relative',
        transform: 'translateX(-24px)',
        marginTop: '28px',
        backgroundColor: 'var(--grey200)',
        display: 'flex',
      }}
    >
      {(!isGettingLocation && gridPoints && gridPoints.lat && (
        <GoogleMap
          style={{ flexGrow: 1 }}
          center={gridPoints}
          defaultZoom={17}
          yesIWantToUseGoogleMapApiInternals
          options={(maps) => ({
            mapTypeId: maps.MapTypeId.SATELLITE,
            disableDoubleClickZoom: true,
            zoomControl: true,
            streetViewControl: false,
            scaleControl: true,
            fullscreenControl: false,
          })}
        >
          <MapPinWrapper {...gridPoints} />
        </GoogleMap>
      )) || (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '152px',
            flexGrow: 1,
          }}
        >
          {(!!errors && <MapErrorPin />) || (isGettingLocation ? <LoadingAnimation /> : <MapPin />)}
        </div>
      )}
    </div>
  );
}

function MapPinWrapper() {
  return <MapPin style={{ display: 'absolute', transform: 'translate(-50%, -100%)' }} />;
}

export default StoreSetup;

/* global google */
