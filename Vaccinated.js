import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Vaccinated = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${selectedCountry}?lastdays=30`)
      .then(response => {
        const timeline = response.data.timeline;
        setData({
          labels: Object.keys(timeline),
          datasets: [
            {
              label: 'Vaccinations',
              data: Object.values(timeline),
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            },
          ],
        });
      });
  }, [selectedCountry]);

  return (
    <div>
      <h2>Vaccinated</h2>
      <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
        {countries.map((country) => (
          <option key={country.countryInfo.iso2} value={country.country}>
            {country.country}
          </option>
        ))}
      </select>
      <Line data={data} />
    </div>
  );
};

export default Vaccinated;
