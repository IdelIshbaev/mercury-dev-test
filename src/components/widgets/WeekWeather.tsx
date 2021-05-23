import React, {useState} from 'react';
import './Weather.scss'
import Select from 'react-select';
import { convertTypeAcquisitionFromJson } from 'typescript';

function WeekWeather() {
  const options = [
    { value: 'sankt petersburg', label: 'Sankt Petersburg' },
    { value: 'saratov', label: 'Saratov' },
    { value: 'samara', label: 'Samara' },
    { value: 'saransk', label: 'Saransk' },
  ];
  const [selectedOption, setSelectedOption] = useState<any>({});
  return (
    <div className="weather">
      <h1 className="weather__header">
        7 Days Forecast
      </h1>
      <div className="weather__selects">
        <Select
          placeholder="Select city"
          onChange={setSelectedOption}
          options={options}
          className="weather__select"
        />
      </div>
    </div>
  );
}

export default WeekWeather;
