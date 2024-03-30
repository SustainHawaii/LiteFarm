import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Switch from '../../Form/Switch';
import DateRangePicker from '../../Form/DateRangePicker';
import { getDateInputFormat } from '../../../util/moment';

export function FilterDateRange({
  setDirty,
  defaultFromDate,
  defaultToDate,
  onDirty,
  subject,
  filterRef,
  shouldReset,
  style,
  handleApply
}) {
  const [fromDate, setFromDate] = useState(defaultFromDate ?? '');
  const [toDate, setToDate] = useState(defaultToDate ?? '');
  useEffect(() => {
    if (shouldReset) {
      setFromDate('');
      setToDate('');
    }
  }, [shouldReset]);
  useEffect(() => {
    if (filterRef?.current) {
      filterRef.current.FROM_DATE = fromDate || undefined;
    }
  }, [fromDate]);
  useEffect(() => {
    if (filterRef?.current) {
      filterRef.current.TO_DATE = toDate || undefined;
    }
  }, [toDate]);
  const [showDateFilter, setShowDateFilter] = useState(!!(defaultFromDate || defaultToDate));

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    setDirty?.();
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    setDirty?.();
    handleApply();
  };
  return (
    <div style={{ display: 'flex', gap: '24px',fontFamily:'Poppins', flexDirection: 'column', ...style }}>
     
        <>
          <DateRangePicker
            fromProps={{
              value: fromDate,
              onChange: handleFromDateChange,
            }}
            toProps={{
              value: toDate,
              onChange: handleToDateChange
              
            }}
          />
        </>
    </div>
  );
}

FilterDateRange.prototype = {
  label: PropTypes.string,
  selected: PropTypes.bool,
  removable: PropTypes.bool,
  shouldReset: PropTypes.number,
};
