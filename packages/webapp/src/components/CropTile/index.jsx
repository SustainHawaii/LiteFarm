import React, { useMemo, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import Square from '../Square';
import PropTypes from 'prop-types';
import { StatusLabel } from '../CardWithStatus/StatusLabel';
import { managementPlanStatusTranslateKey } from '../CardWithStatus/ManagementPlanCard/ManagementPlanCard';
import { useTranslation } from 'react-i18next';
import { useIsOffline } from '../../containers/hooks/useOfflineDetector/useIsOffline';

export default function PureCropTile({
  className,
  title,
  onClick,
  style,
  cropCount = {},
  needsPlan,
  src,
  alt,
  isPastVariety,
  isCropTemplate,
  children,
  isSelected,
  status,
  activecard,
  pastcard,
  plannedcard,
  needplancard,
  getIsOffline = useIsOffline,
}) {
  const { active = 0, abandoned = 0, planned = 0, completed = 0, noPlans = 0 } = cropCount;
  const { t } = useTranslation();
  const isOffline = getIsOffline();
  const [hasError, setHasError] = useState();
  const showImage = !(isOffline && hasError);
  const image = useMemo(() => {
    if (showImage)
    {
      return (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={styles.img}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'crop-images/default.jpg';
            setHasError(true);
          }}
        />
      );
    } else
    {
      return <div className={clsx(styles.img, styles.imgPlaceHolder)} />;
    }
  }, [showImage, src, alt, styles.img]);

  return (
    <>
      {plannedcard && planned !== 0 ? (
        <div
          data-cy="crop-tile"
          className={clsx(
            styles.container,
            isPastVariety && styles.pastVarietyContainer,
            isCropTemplate && styles.cropTemplateContainer,
            isSelected && styles.selectedContainer,
            className
          )}
          style={style}
          onClick={onClick}
        >
          {image}
          {plannedcard && planned !== 0 && (
            <div className={styles.cropCountContainer}>
              <Square style={{ color: 'white', background: '#AA5F04' }} isCropTile>
                {planned}
              </Square>
            </div>
          )}
          <div className={styles.info}>
            <div data-cy="crop-name" className={styles.infoMain}>
              {title}
            </div>
            {children}
          </div>
        </div>
      ) : activecard && active !== 0 ? (
        <div
          data-cy="crop-tile"
          className={clsx(
            styles.container,
            isPastVariety && styles.pastVarietyContainer,
            isCropTemplate && styles.cropTemplateContainer,
            isSelected && styles.selectedContainer,
            className
          )}
          style={style}
          onClick={onClick}
        >
          {image}
          {activecard && active !== 0 && (
            <div className={styles.cropCountContainer}>
              <Square style={{ color: 'white', background: '#037A0F' }} isCropTile>
                {active}
              </Square>
            </div>
          )}
          <div className={styles.info}>
            <div data-cy="crop-name" className={styles.infoMain}>
              {title}
            </div>
            {children}
          </div>
        </div>
      ) : pastcard && completed !== 0 && abandoned !== 0 ? (
        <div
          data-cy="crop-tile"
          className={clsx(
            styles.container,
            isPastVariety && styles.pastVarietyContainer,
            isCropTemplate && styles.cropTemplateContainer,
            isSelected && styles.selectedContainer,
            className
          )}
          style={style}
          onClick={onClick}
        >
          {image}
          {pastcard && completed !== 0 && abandoned !== 0 && (
            <div className={styles.cropCountContainer}>
              <Square style={{ color: 'white', background: '#AA5F04' }} isCropTile>
              </Square>
            </div>
          )}
          <div className={styles.info}>
            <div data-cy="crop-name" className={styles.infoMain}>
              {title}
            </div>
            {children}
          </div>
        </div>
      ) : needplancard && noPlans !== 0 ? (
        <div
          data-cy="crop-tile"
          className={clsx(
            styles.container,
            isPastVariety && styles.pastVarietyContainer,
            isCropTemplate && styles.cropTemplateContainer,
            isSelected && styles.selectedContainer,
            className
          )}
          style={style}
          onClick={onClick}
        >
          {image}
          {needplancard && noPlans !== 0 && (
            <div className={styles.cropCountContainer}>
              <Square style={{ color: 'white', background: '#d02620' }} isCropTile>
              </Square>
            </div>
          )}
          <div className={styles.info}>
            <div data-cy="crop-name" className={styles.infoMain}>
              {title}
            </div>
            {children}
          </div>
        </div>
      ) : !activecard && !pastcard && !needplancard && !plannedcard ? (
        <>
          <div
            data-cy="crop-tile"
            className={clsx(
              styles.container,
              isPastVariety && styles.pastVarietyContainer,
              isCropTemplate && styles.cropTemplateContainer,
              isSelected && styles.selectedContainer,
              className,
            )}
            style={style}
            onClick={onClick}
          >
            {image}

            {status && (
              <div className={styles.cropCountContainer}>
                <StatusLabel
                  style={{
                    borderRadius: '4px 4px 4px 4px',
                  }}
                  color={status}
                  label={t(`MANAGEMENT_PLAN.STATUS.${managementPlanStatusTranslateKey[status]}`)}
                  sm
                />
              </div>
            )}
            {noPlans !== 0 && (
              <div className={styles.needsPlanContainer}>
                <Square color={'needsPlan'} isCropTile style={{ borderBottomRightRadius: '4px' }}>
                  {noPlans}
                </Square>
              </div>
            )}
            <div className={styles.info}>
              <div data-cy="crop-name" className={styles.infoMain}>
                {title}
              </div>
              {children}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

PureCropTile.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  cropCount: PropTypes.exact({
    abandoned: PropTypes.number,
    active: PropTypes.number,
    planned: PropTypes.number,
    completed: PropTypes.number,
  }),
  needsPlan: PropTypes.bool,
  title: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  isPastVariety: PropTypes.bool,
  isCropTemplate: PropTypes.bool,
  status: PropTypes.oneOf(['active', 'planned', 'completed', 'abandoned']),
};
