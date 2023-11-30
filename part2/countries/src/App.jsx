import axios from 'axios';
import React, { useState, useEffect } from 'react';

const baseApiURL = `https://studies.cs.helsinki.fi/restcountries/api`;

const Languages = ({ languages }) => (
  <>
    <div>
      <h3>Languages: </h3>
      {
        <ul>
          {Object.values(languages).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      }
    </div>
  </>
);

const Country = ({ countryName }) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios.get(`${baseApiURL}/name/${countryName}`).then(({ data }) => {
      setCountry(data);
    });
  }, [countryName]);

  if (!country) {
    return null;
  }

  return (
    <>
      <div>
        <h1>{countryName}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
      </div>

      <Languages languages={country.languages} />
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    </>
  );
};

const App = () => {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(`${baseApiURL}/all`).then(res => {
      setCountries(res.data.map(c => c.name.common));
    });
  }, [value]);

  const handleSearchCountries = e => {
    setValue(e.target.value.toLowerCase());
  };

  const filterCountries = countries.filter(country =>
    country.toLowerCase().includes(value)
  );

  const handleSelectedCountry = (country) => {
    setValue(country.toLowerCase())
  };

  return (
    <>
      <div>
        <label>find countries</label>{' '}
        <input value={value} onChange={handleSearchCountries} />
        {filterCountries?.length > 1 ? (
          <div className='countries-output'>
            {value === ''
              ? 'Please start typing to search for countries'
              : filterCountries.length > 10
              ? 'Too many matches, specify another filter'
              : filterCountries.map((country, index) => (
                  <p key={index}>
                    {country}
                    <button onClick={() => handleSelectedCountry(country)}>show</button>
                  </p>
                ))}
          </div>
        ) : (
          filterCountries.length == 1 && (
            <div>
              <Country countryName={filterCountries.toString()} />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default App;
