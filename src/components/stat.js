import React from 'react';
import PropTypes from 'prop-types';

const Stat = ({title, value}) => {
  return (
    <div className="stat">
      <h2>{value}</h2> <h5>{title.toUpperCase()}</h5>
    </div>
  );
};

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default Stat;