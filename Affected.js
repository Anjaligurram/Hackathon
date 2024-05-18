import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Affected = () => {
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
    axios.get(`https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=30`)
      .then(response => {
        const timeline = response.data.timeline;
        setData({
          labels: Object.keys(timeline.cases),
          datasets: [
            {
              label: 'Cases',
              data: Object.values(timeline.cases),
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'Deaths',
              data: Object.values(timeline.deaths),
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: 'Recoveries',
              data: Object.values(timeline.recovered),
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
          ],
        });
      });
  }, [selectedCountry]);

  return (
    <div>
      <h2>Affected</h2>
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

export default Affected;
