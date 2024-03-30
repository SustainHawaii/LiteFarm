import React, { useState } from 'react';
import './Style.css';

const Datepicker = ({DateType,DefaultToDate}) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        
        className="custom-datepicker"
        style={{ color: selectedDate ? 'black' : 'gray' }}
      />
    </div>
     
  );
};

export default Datepicker;
