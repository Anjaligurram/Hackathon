import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NeighboringCountries = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const countries = ['India', 'Sri Lanka', 'Bangladesh', 'China', 'Nepal'];
    Promise.all(countries.map(country =>
      axios.get(`https://disease.sh/v3/covid-19/countries/${country}`)
    ))
    .then(responses => {
      setData(responses.map(response => response.data));
    });
  }, []);

  return (
    <div>
      <h2>Neighboring Countries</h2>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
            <th>Deaths</th>
            <th>Recoveries</th>
            <th>Vaccinations</th>
          </tr>
        </thead>
        <tbody>
          {data.map(country => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>{country.cases}</td>
              <td>{country.deaths}</td>
              <td>{country.recovered}</td>
              <td>{country.population - country.active - country.recovered - country.deaths}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NeighboringCountries;
