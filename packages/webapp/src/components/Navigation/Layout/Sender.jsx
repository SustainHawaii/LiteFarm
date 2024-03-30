import React from 'react';
import Homepage from '../../../containers/Homecontainer/Homepage';

const Sender = ({ menuActive }) => {
  return (
    <div>
      <div className="container d-none">
        <Homepage menuActive={menuActive} />
      </div>
    </div>
  );
};

export default Sender;
