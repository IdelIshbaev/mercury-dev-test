import React from 'react';
import './HomePage.scss'
import WeekWeather from './widgets/WeekWeather'
import DayWeather from './widgets/DayWeather'
function HomePage() {
  return (
	  <div className="home-page home-page--background">
		  <h1 className="home-page__header">
				<span className="home-page__header_first">Weather</span>
			  	<span className="home-page__header_second">forecast</span>
		  </h1>
		  <div className="home-page__weather">
				<WeekWeather />
		  		<DayWeather />
			</div>
    </div>
  );
}

export default HomePage;
