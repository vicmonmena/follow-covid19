import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './components.css'

const CSSselector = ({selectedCSS = "flat", handleSelectCSS}) => {
  const [url, setUrl] = useState('https://drasite.com/flat-remix-css')
  useEffect(() => {
    setUrl(handleSelectCSS === "skeuos" ? "https://drasite.com/skeuos-css" : "https://drasite.com/flat-remix-css")
  }, []);

  function handleChangeCSS(event) {
    if(event.target.value===selectedCSS) return false;
    else {
      handleSelectCSS(event.target.value)
    }
  }

  return (
    <div className="cssselector">
      <span className="cssselector-title">
        ¿Cómo quieres ver esta web?
      </span>
      <select 
        id="cssselector"
        onChange={handleChangeCSS}
        value={selectedCSS}>
          <option key="flat" value="flat">Flat Remix</option>
          <option key="skeuos" value="skeuos">Skeuomorphic</option>
      </select>
      <a style={{marginLeft: "10px"}} href={url} target="_blank" rel="noopener noreferrer">info</a>
    </div>
  );
};

CSSselector.propTypes = {
  selectedCSS: PropTypes.string,
  handleChangeCSS: PropTypes.func
};

export default CSSselector;