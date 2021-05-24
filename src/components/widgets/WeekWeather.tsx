import React, {useState, useEffect} from 'react';
import './Weather.scss'
import Select from 'react-select';
import { convertTypeAcquisitionFromJson } from 'typescript';
import axios, { CancelTokenSource } from 'axios';
// interface IPost {
//     id: number;
//     userId?: number;
//     title: string;
//     body: string;
//   }
// const defaultPosts: IPost[] = [];

function WeekWeather() {

  // const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(
  //   defaultPosts
  // );
  const [weekForecast, setWeekForecast] = useState<any>()

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

  // useEffect(() => {
  //   axios
  //     .get<any>('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4434c55d72bc6fd2726403754e664105', {
  //     // .get<any>('https://jsonplaceholder.typicode.com/posts', {
  //       cancelToken: cancelTokenSource.token,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       timeout: 10000,
  //     })
  //     .then((response) => {
  //       setWeekForecast(response.data);
  //       console.log(response.data)
  //       setLoading(false);
  //     })
  //     .catch((ex) => {
  //       let error = axios.isCancel(ex)
  //         ? 'Request Cancelled'
  //         : ex.code === 'ECONNABORTED'
  //         ? 'A timeout has occurred'
  //         : ex.response.status === 404
  //         ? 'Resource Not Found'
  //         : 'An unexpected error has occurred';

  //       setError(error);
  //       setLoading(false);
  //     });
  // }, []);


  //____________________________
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
      <div className="weather__content">
        {weekForecast == null ?
         <div className="weather__content__temp-icon">
          <p className="weather__content__temp-icon__text">Fill in all the fields and the weather will be displayed</p>
          </div> :
          <img className="weather__content__main-icon" src={"http://openweathermap.org/img/wn/" + weekForecast.weather[0].icon + "@2x.png"} />
        }
      </div>
    </div>
  );
}

export default WeekWeather;
