import sunnyImage from '../assets/images/sunny.png'
import cloudyImage from '../assets/images/cloudy.png'
import rainyImage from '../assets/images/rainy.png'
import snowyImage from '../assets/images/snowy.png'

const WeatherApp = () => {
  return (
    <div className="container">
      <div className="weather_app">
        <div className="search">
          <div className="search_top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">London</div>
          </div>

          <div className="search_bar">
            <input type="text" placeholder="Enter Location" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="weather">
          <img src={sunnyImage} alt="sunny" />
          <div className="weather_type">Clear</div>
          <div className="temp">28℃</div>
        </div>
        <div className="weather_date">
          <p>Fri, 3 May</p>
        </div>
        <div className="weather_data">
          <div className="humidity">
            <div className="data_name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">35%</div>
          </div>
          <div className="wind">
            <div className="data_name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">3 km/hr</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp