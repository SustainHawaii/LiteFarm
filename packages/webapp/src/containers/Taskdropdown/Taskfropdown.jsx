import React from 'react';

const TaskDropdown = () => {
  return (
    <div>
      <div className="row g-3">
        <div className="col-md-5">
          <select className="form-select" id="country" required="" fdprocessedid="t861mh" style={{ height: '63px', width: '15rem', color: '#ccc' }}>
            <option value="">Types of field work</option>
            <option>United States</option>
          </select>
          <div className="invalid-feedback">Please select a valid country.</div>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            id="zip"
            placeholder="Notes"
            required=""
            fdprocessedid="57zi9o"
            style={{ height: '63px', width: '11rem', color: '#ccc',marginLeft:'5rem'  }}
          />
          <div className="invalid-feedback">Zip code required.</div>
        </div>
      </div>
    </div>
  );
};

export default TaskDropdown;
