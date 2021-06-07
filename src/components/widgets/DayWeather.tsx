import React, {useState, useEffect} from 'react';
import './Weather.scss'
import Select from 'react-select'
import axios, { CancelTokenSource } from 'axios';
interface ISel {
  value: String,
  label: String
}
function DayWeather() {

  const options = [
    { value: 'sanktpetersburg', label: 'Sankt Petersburg' },
    { value: 'saratov', label: 'Saratov' },
    { value: 'samara', label: 'Samara' },
    { value: 'saransk', label: 'Saransk' },
  ];
  const [selectedOption, setSelectedOption] = useState<any>({ value: '', label: '' });
  const [selectedDate, setSelectedDate] = useState<any>('');
  const [weekForecast, setWeekForecast] = useState<any>('')

  const coordinates: {[index: string]:any} = {
    sanktpetersburg: { 'lat': '59.9', 'lon': '30.3' } ,
    saratov: { lat: '51.5', 'lon': '45.9' } ,
    samara: { 'lat': '53.2', 'lon': '50.2' } ,
    saransk: { 'lat': '54.1', 'lon': '45.1' } 
  };
  //____________________________
  

  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState(
    ''
  );

  const cancelToken = axios.CancelToken; //create cancel token
  const [cancelTokenSource, setCancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = React.useState(cancelToken.source());

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('User cancelled operation');
    }
  };

  useEffect(() => {
    if (selectedOption.value != '' && selectedDate != '') {
      // console.log(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coordinates[selectedOption.value].lat}&lon=${coordinates[selectedOption.value].lon}&dt=${selectedDate.valueAsNumber/1000}&appid=4434c55d72bc6fd2726403754e664105`)

      axios
        .get<any>(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coordinates[selectedOption.value].lat}&lon=${coordinates[selectedOption.value].lon}&dt=${selectedDate.valueAsNumber/1000}&appid=4434c55d72bc6fd2726403754e664105`, {
          cancelToken: cancelTokenSource.token,
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        })
        .then((response) => {
          setWeekForecast(response.data);
          console.log(response.data)
          // console.log(weekForecast)
          setLoading(false);
        })
        .catch((ex) => {
          let error = axios.isCancel(ex)
            ? 'Request Cancelled'
            : ex.code === 'ECONNABORTED'
              ? 'A timeout has occurred'
              : ex.response.status === 404
                ? 'Resource Not Found'
                : 'An unexpected error has occurred';

          setError(error);
          setLoading(false);
        });
    }
  }, [selectedOption, selectedDate]);



  return (
    <div className="weather weather--day-mobile">
      <h1 className="weather__header">
        Forecast for a Date in the Past
      </h1>
      <div className="weather__selects">
        <Select
          placeholder="Select city"
          onChange={setSelectedOption}
          options={options}
          className="weather__select"
        />
        <input
          placeholder="Select date"
          onChange={e => setSelectedDate(e.target)}
          type="date"
          className="weather__select"
          />
      </div>
      <div className="weather__content">
        
        {weekForecast == '' ?
          <div className="weather__content__temp-icon">
            <p className="weather__content__temp-icon__text">Fill in all the fields and the weather will be displayed</p>
          </div> :
          <div>
            <p className="weather__content__date">{selectedDate.value}</p>
            <div className="weather__content__main-icon ">
              <img  className="weather__content__main-icon--icon" src={"http://openweathermap.org/img/wn/" + weekForecast.current.weather[0].icon + "@2x.png"} />
            </div>
            <p className="weather__content__temp ">+{Number((weekForecast.current.temp-273).toFixed(0))}&#186;</p>
          </div>
        }
      </div>
    </div>
  );
  
}

export default DayWeather;
 