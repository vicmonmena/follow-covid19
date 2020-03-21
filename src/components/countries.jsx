import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Countries = ({selectedCountry = "MUNDIAL", handleSelectCountry}) => {

  // const [url, setUrl] = useState('https://covid19.mathdro.id/api/countries');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await fetch('https://covid19.mathdro.id/api/countries')
        .then(res => res.json())
        .catch(err => {
          console.log(err)
        });
        const countryList = data !== undefined ? data.countries : []
        setCountries(data !== undefined ? {'MUNDIAL': "md", ...countryList } : {'Error loading countries': 'err'});
      setLoading(false);
    }
    fetchData();
  }, []);

  function handleChangeCountry(event) {
    if(event.target.value===selectedCountry) return false;
    else {
      handleSelectCountry(event.target.value)
    }
  }

  return (
    <div className="topright">
      { loading === true && 
        <p>Cargando países ...</p>
      }
      { loading ===false && 
        <select 
          id="country"
          onChange={handleChangeCountry}
          value={selectedCountry}>
          {
            Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)
          }
        </select>
      }
    </div>
  );
};

Countries.propTypes = {
  selectedCountry: PropTypes.string,
  handleSelectCountry: PropTypes.func.isRequired
};

export default Countries;