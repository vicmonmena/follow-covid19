import React from 'react';
import PropTypes from 'prop-types';
import {Spring} from 'react-spring/renderprops'
import './components.css'

const Stat = ({title = "no title", value = 0}) => {

  function formatValue(value) {
    return new Intl.NumberFormat("es-ES").format(value)
  }

  return (
    <div className="stat">
        <Spring 
          from={{ number: 0 }}
          to={{ number: value }}
          config={{delay: 300}}>
            {({number}) => <h2 >{formatValue(number.toFixed(0))}</h2>}
        </Spring>
       <h5 >{title.toUpperCase()}</h5>
    </div>
  );
};

Stat.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number
};

export default Stat;