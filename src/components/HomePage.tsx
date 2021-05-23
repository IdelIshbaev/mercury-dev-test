import React from 'react';
import './HomePage.scss'
import DayWeather from './widgets/DayWeather'
import WeekWeather from './widgets/WeekWeather'
function HomePage() {
  return (
	  <div className="home-page home-page--background">
		  <h1 className="home-page__header">
				<span className="home-page__header_first">Weather</span>
			  	<span className="home-page__header_second">forecast</span>
		  </h1>
		  <div className="home-page__weather">
		  		<DayWeather />
				<WeekWeather />
			</div>
    </div>
  );
}

export default HomePage;
