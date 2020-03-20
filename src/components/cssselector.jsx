import React from 'react';
import PropTypes from 'prop-types';

const CSSselector = ({selectedCSS = "flat", handleSelectCSS}) => {

  function handleChangeCSS(event) {
    if(event.target.value===selectedCSS) return false;
    else {
      handleSelectCSS(event.target.value)
    }
  }

  return (
    <div className="cssselector">
      <select 
          id="cssselector"
          onChange={handleChangeCSS}
          value={selectedCSS}>
            <option key="flat" value="flat">Flat Remix</option>
            <option key="skeuos" value="skeuos">Skeuomorphic</option>
        </select>
    </div>
  );
};

CSSselector.propTypes = {
  selectedCSS: PropTypes.string,
  handleChangeCSS: PropTypes.func.isRequired
};

export default CSSselector;