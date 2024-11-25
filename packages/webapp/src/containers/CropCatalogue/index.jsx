import Layout from '../../components/Layout';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/PageTitle/v2';
import PageBreak from '../../components/PageBreak';
import PureSearchbarAndFilter from '../../components/PopupFilter/PureSearchbarAndFilter';
import CropStatusInfoBox from '../../components/CropCatalogue/CropStatusInfoBox';
import { AddLink, Semibold, Text, Underlined } from '../../components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { cropsSelector } from '../cropSlice';
import Button from '@material-ui/core/Button';
import useCropTileListGap from '../../components/CropTile/useCropTileListGap';
import PureCropTile from '../../components/CropTile';
import PureCropTileContainer from '../../components/CropTile/CropTileContainer';
import React, { useEffect, useState } from 'react';
import { getCropsAndManagementPlans } from '../saga';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MuiFullPagePopup from '../../components/MuiFullPagePopup/v2';
import CropCatalogueFilterPage from '../Filter/CropCatalogue';
import './Style.css';
import {
  cropCatalogueFilterDateSelector,
  cropCatalogueFilterSelector,
  isFilterCurrentlyActiveSelector,
  setCropCatalogueFilterDate,
  resetCropCatalogueFilter,
} from '../filterSlice';
import { isAdminSelector } from '../userFarmSlice';
import useCropCatalogue from './useCropCatalogue';
import useStringFilteredCrops from './useStringFilteredCrops';
import useSortByCropTranslation from './useSortByCropTranslation';
import {
  resetAndUnLockFormData,
  setPersistedPaths,
} from '../hooks/useHookFormPersist/hookFormPersistSlice';
import CatalogSpotlight from './CatalogSpotlight';
import ActiveFilterBox from '../../components/ActiveFilterBox';
import { useStartAddCropVarietyFlow } from '../CropVarieties/useStartAddCropVarietyFlow';
import Newcrop from '../../components/NewCrop/Newcrop';
import { pointer } from 'd3';
import filterIcon from './/..//../assets/icons/filter/activefilter.png';
import plantTaskSlice from '../slice/taskSlice/plantTaskSlice';
import { useMediaQuery } from '@material-ui/core';
import theme from '../../assets/theme';
export default function CropCatalogue({ history }) {
  const { t } = useTranslation();
  const isAdmin = useSelector(isAdminSelector);
  const dispatch = useDispatch();

  const [filterString, setFilterString] = useState('');
  const filterStringOnChange = (e) => setFilterString(e.target.value);
  const {
    active,
    abandoned,
    planned,
    completed,
    noPlans,
    sum,
    cropCatalogue,
    filteredCropsWithoutManagementPlan,
  } = useCropCatalogue(filterString);
  const crops = useStringFilteredCrops(
    useSortByCropTranslation(useSelector(cropsSelector)),
    filterString,
  );
  const { ref: containerRef, gap, padding, cardWidth } = useCropTileListGap([sum, crops.length]);
  
  const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(1, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: '-1rem',
      color: '#c7c7c7',
      marginTop: '-1rem',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1.5)}px)`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('md')]: {
        width: '60vw',
        color: '#31374a',
        fontFamily: 'Poppins',
      },
    },
  }));
  const Mainclasses = useStyles();
  const NewuseStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const mainer = NewuseStyles();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [activecard, setActive] = useState(false);
  const [pastcard, setPast] = useState(false);
  const [plannedcard, setPlanned] = useState(false);
  const [needplancard, setNeedplan] = useState(false);
  const onFilterClose = () => {
    setIsFilterOpen(false);
  };
  const onFilterOpen = () => {
    setIsFilterOpen(true);
  };

  const date = useSelector(cropCatalogueFilterDateSelector);
  const setDate = (date) => dispatch(setCropCatalogueFilterDate(date));

  const cropCatalogueFilter = useSelector(cropCatalogueFilterSelector);
  const isFilterCurrentlyActive = useSelector(isFilterCurrentlyActiveSelector('cropCatalogue'));

  useEffect(() => {
    dispatch(resetAndUnLockFormData());
  }, []);
  const cropTileHandler = (cropId) => {
    history.push(`/crop_varieties/crop/${cropId}`);
  };

  const { onAddCropVariety } = useStartAddCropVarietyFlow();
  const onAddCrop = () => {
    dispatch(
      setPersistedPaths([
        '/crop/new',
        '/crop/new/add_crop_variety',
        '/crop/new/add_crop_variety/compliance',
      ]),
    );

    history.push('/crop/new');
  };

  const marginSetter = useMediaQuery(theme.breakpoints.up('lg'))
  const marginSetter2 = useMediaQuery(theme.breakpoints.up('md'))
  const marginSetter3 = useMediaQuery(theme.breakpoints.up('sm'))
  const marginSetter4 = useMediaQuery(theme.breakpoints.up('xl'))


  const resetFilter = () => dispatch(resetCropCatalogueFilter());
  return (
    <>
      <div style={{ borderRadius: '5px' }}>


        <div>
          <Layout
            classes={{ container: { position: "relative", width: '100vw', marginLeft: marginSetter ? '0vw' : marginSetter2 ? "0vw" : marginSetter3 ? "0vw" : "-1vw" } }}
            style={{ borderRadius: '10rem', width: '100%' }}
          >
            <h1 className="heading " style={{ fontFamily: 'Poppins',left:'0rem' ,fontWeight:'bold'}}>
              CROP
            </h1>
            <PageTitle
              title={t('CROP_CATALOGUE.CROP_CATALOGUE')}
              style={{ paddingBottom: '20px' }}
            />

            <div className="container " style={{ width: '100vw' }} >

              <div
                style={{
                  position: 'relative',
                  height: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  left: '-18px',
                }}
              >
                <div className={Mainclasses.search}>
                  <InputBase
                    onFilterOpen={onFilterOpen}
                    value={filterString}
                    onChange={filterStringOnChange}
                    isFilterActive={isFilterCurrentlyActive}
                    placeholder="Search Here…"
                    style={{
                      width: '59vw',
                      height: '4rem',
                      left: '-1vw',
                      border: '1px solid #D8D9DA',
                      borderRadius: '7px',
                      marginBottom: '1.5rem',
                    }}
                    classes={{
                      root: Mainclasses.inputRoot,
                      input: Mainclasses.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
               
              </div>
              <Button
                variant="contained"
                color="#3ea992"
                size="large"
                className={mainer.button}
                style={{
                  boxShadow: 'none',
                  backgroundColor: 'rgb(245, 249, 248)',
                  fontSize: '20px',
                  letterSpacing: '2px',
                  height: '61px',
                  width: '150px',
                  color: 'rgb(75, 183, 195)',
                  position: 'absolute',
                  marginTop: '-78px',
                  left: '72vw',
                }}
                onClick={onFilterOpen}
              >
                <span style={{ fontSize: '15px', fontweight: 'bold' }}>FILTER</span>
                <img src={filterIcon} alt="Task Logo" className="filter-logo" />
              </Button>
            </div>

            <CatalogSpotlight />

            <MuiFullPagePopup open={isFilterOpen} onClose={onFilterClose}>
              <CropCatalogueFilterPage onGoBack={onFilterClose} />
            </MuiFullPagePopup>

            {isFilterCurrentlyActive && (
              <div style={{ marginBottom: '32px' }}>
                <ActiveFilterBox pageFilter={cropCatalogueFilter} pageFilterKey={'cropCatalogue'} />
                <div style={{ marginTop: '12px' }}>
                  <Underlined style={{ color: '#AA5F04' }} onClick={resetFilter}>
                    {t('FILTER.CLEAR_ALL_FILTERS')}
                  </Underlined>
                </div>
              </div>
            )}

            <div ref={containerRef}>
              {sum + filteredCropsWithoutManagementPlan.length ? (
                <>
                  <PageBreak
                    style={{ paddingBottom: '16px' }}
                    label={t('CROP_CATALOGUE.ON_YOUR_FARM')}
                  />
                  <div className="container-fluid " style={{ marginBottom: '2.5rem' }}>
                    <CropStatusInfoBox
                      status={{ active, abandoned, completed, planned, noPlans }}
                      style={{ marginBottom: '16px', fontsize: '23px' }}
                      date={date}
                      setDate={setDate}
                      setActive={setActive}
                      setPast={setPast}
                      setNeedplan={setNeedplan}
                      setPlanned={setPlanned}
                      activecard={activecard}
                      plannedcard={plannedcard}
                      pastcard={pastcard}
                      needplancard={needplancard}
                    />

                  </div>


                  <div className="container-fluid">
                    <PureCropTileContainer gap={gap} padding={padding} >
                      {needplancard
                        ? filteredCropsWithoutManagementPlan.map((cropVariety) => {
                          const { crop_translation_key, crop_photo_url, crop_id, noPlansCount } =
                            cropVariety;
                          const imageKey = cropVariety.crop_translation_key?.toLowerCase();

                          return (
                            <PureCropTile
                              key={crop_id}
                              title={t(`crop:${crop_translation_key}`)}
                              src={crop_photo_url}
                              alt={imageKey}
                              style={{ width: cardWidth }}
                              onClick={() =>
                                (history.push(`/crop_varieties/crop/${cropVariety.crop_id}`))
                              }
                              cropCount={{
                                noPlans: noPlansCount,
                              }}
                            />
                          );
                        })
                        :
                        activecard ?
                          cropCatalogue.map((cropCatalog) => {
                            const {
                              crop_translation_key,
                              active,
                              abandoned,
                              planned,
                              completed,
                              imageKey,
                              crop_photo_url,
                              crop_id,
                              needsPlan,
                            } = cropCatalog;

                            return (
                              <PureCropTile
                                key={crop_translation_key}
                                cropCount={{
                                  active: active.length,
                                  abandoned: abandoned.length,
                                  planned: planned.length,
                                  completed: completed.length,
                                  noPlans: cropCatalog?.noPlans?.length,
                                }}
                                needsPlan={needsPlan}
                                title={t(`crop:${crop_translation_key}`)}
                                src={crop_photo_url}
                                alt={imageKey}
                                style={{ width: cardWidth }}
                                onClick={() => cropTileHandler(cropCatalog.crop_id)}
                                activecard={activecard}
                                pastcard={pastcard}
                                plannedcard={plannedcard}
                                needplancard={needplancard}
                              />
                            );
                          })
                          : pastcard ?
                            cropCatalogue.map((cropCatalog) => {
                              const {
                                crop_translation_key,
                                active,
                                abandoned,
                                planned,
                                completed,
                                imageKey,
                                crop_photo_url,
                                crop_id,
                                needsPlan,
                              } = cropCatalog;

                              return (
                                <PureCropTile
                                  key={crop_translation_key}
                                  cropCount={{
                                    active: active.length,
                                    abandoned: abandoned.length,
                                    planned: planned.length,
                                    completed: completed.length,
                                    noPlans: cropCatalog?.noPlans?.length,
                                  }}
                                  needsPlan={needsPlan}
                                  title={t(`crop:${crop_translation_key}`)}
                                  src={crop_photo_url}
                                  alt={imageKey}
                                  style={{ width: cardWidth }}
                                  onClick={() => cropTileHandler(cropCatalog.crop_id)}
                                  pastcard={pastcard}

                                />
                              );
                            }) : plannedcard ?
                              cropCatalogue.map((cropCatalog) => {
                                const {
                                  crop_translation_key,
                                  active,
                                  abandoned,
                                  planned,
                                  completed,
                                  imageKey,
                                  crop_photo_url,
                                  crop_id,
                                  needsPlan,
                                } = cropCatalog;

                                return (
                                  <PureCropTile
                                    key={crop_translation_key}
                                    cropCount={{
                                      active: active.length,
                                      abandoned: abandoned.length,
                                      planned: planned.length,
                                      completed: completed.length,
                                      noPlans: cropCatalog?.noPlans?.length,
                                    }}
                                    needsPlan={needsPlan}
                                    title={t(`crop:${crop_translation_key}`)}
                                    src={crop_photo_url}
                                    alt={imageKey}
                                    style={{ width: cardWidth }}
                                    onClick={() => cropTileHandler(cropCatalog.crop_id)}

                                    plannedcard={plannedcard}
                                  />
                                );
                              }) :
                              <PureCropTileContainer gap={gap} padding={padding}>
                                {filteredCropsWithoutManagementPlan.map((cropVariety) => {
                                  const { crop_translation_key, crop_photo_url, crop_id, noPlansCount } = cropVariety;
                                  const imageKey = cropVariety.crop_translation_key?.toLowerCase();

                                  return (
                                    <PureCropTile
                                      key={crop_id}
                                      title={t(`crop:${crop_translation_key}`)}
                                      src={crop_photo_url}
                                      alt={imageKey}
                                      style={{ width: cardWidth }}
                                      onClick={() => history.push(`/crop_varieties/crop/${cropVariety.crop_id}`)}
                                      cropCount={{
                                        noPlans: noPlansCount,
                                      }}
                                    />
                                  );
                                })}
                                {cropCatalogue.map((cropCatalog) => {
                                  const {
                                    crop_translation_key,
                                    active,
                                    abandoned,
                                    planned,
                                    completed,
                                    imageKey,
                                    crop_photo_url,
                                    crop_id,
                                    needsPlan,
                                  } = cropCatalog;

                                  return (
                                    <PureCropTile
                                      key={crop_translation_key}
                                      cropCount={{
                                        active: active.length,
                                        abandoned: abandoned.length,
                                        planned: planned.length,
                                        completed: completed.length,
                                        noPlans: cropCatalog?.noPlans?.length,
                                      }}
                                      needsPlan={needsPlan}
                                      title={t(`crop:${crop_translation_key}`)}
                                      src={crop_photo_url}
                                      alt={imageKey}
                                      style={{ width: cardWidth }}
                                      onClick={() => history.push(`/crop_varieties/crop/${cropCatalog.crop_id}`)}
                                    />
                                  );
                                })}
                              </PureCropTileContainer>




                      }

                    </PureCropTileContainer>
                  </div>
                </>
              ) : (
                isFilterCurrentlyActive && (
                  <Semibold style={{ color: 'var(--green)' }}>
                    {t('CROP_CATALOGUE.NO_RESULTS_FOUND')}
                  </Semibold>
                )
              )}
              <div className="container-fluid">
                {isAdmin && !isFilterCurrentlyActive && (
                  <>
                    {!!crops?.length && (
                      <>
                        <PageBreak
                          style={{ paddingBottom: '16px' }}
                          label={t('CROP_CATALOGUE.ADD_TO_YOUR_FARM')}
                        />
                        <PureCropTileContainer gap={gap} padding={padding}>
                          {crops.map((crop) => {
                            const { crop_translation_key } = crop;
                            const imageKey = crop_translation_key?.toLowerCase();
                            return (
                              <PureCropTile
                                key={crop.crop_id}
                                title={t(`crop:${crop_translation_key}`)}
                                src={crop.crop_photo_url}
                                alt={imageKey}
                                style={{ width: cardWidth }}
                                isCropTemplate
                                onClick={() => {
                                  onAddCropVariety(crop.crop_id);
                                }}
                              />
                            );
                          })}
                        </PureCropTileContainer>
                      </>
                    )}
                    <Text style={{ paddingBottom: '8px' }}>{t('CROP_CATALOGUE.CAN_NOT_FIND')}</Text>
                    <AddLink data-cy="crop-addLink" onClick={onAddCrop} style={{ cursor: pointer }}>
                      {t('CROP_CATALOGUE.ADD_CROP')}
                    </AddLink>
                  </>
                )}

              </div>
            </div>
          </Layout>
        </div>
      </div>
    </>
  );
}
