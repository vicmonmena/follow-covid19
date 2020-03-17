import React from 'react';
import PropTypes from 'prop-types';

const Stat = ({title = "no title", value = 0}) => {

  function formatValue(value) {
    return new Intl.NumberFormat("es-ES").format(value)
  }

  return (
    <div className="stat">
      <h2 >{formatValue(value)}</h2> <h5 >{title.toUpperCase()}</h5>
    </div>
  );
};

Stat.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number
};

export default Stat;