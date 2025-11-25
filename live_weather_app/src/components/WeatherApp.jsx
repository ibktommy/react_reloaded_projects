import sunnyImage from "../assets/images/sunny.png";
import cloudyImage from "../assets/images/cloudy.png";
import rainyImage from "../assets/images/rainy.png";
import snowyImage from "../assets/images/snowy.png";
import { useEffect, useState } from "react";

const WeatherApp = () => {
  const [data, setData] = useState();
  const [location, setLocation] = useState("");

  // fetch default location for app
  async function fetchDefaultWeather() {
    try {
      const default_location = "Lagos";
      const url = `/.netlify/functions/apiHandler?city=${default_location}`;
      const res = await fetch(url);
      const default_data = await res.json();
      setData(default_data);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  }

  // get data before app renders
  useEffect(() => {
    fetchDefaultWeather();
  }, []);

  // update city input value
  function handleInputChange(e) {
    setLocation(e.target.value);
  }

  // get weather data
  async function searchLocationWeather() {
    if (location.trim() !== "") {
      const res = await fetch(
        `/.netlify/functions/apiHandler?city=${location}`
      );
      const locationData = await res.json();
      setData(locationData);
      console.log(locationData);
      setLocation("");
    } else {
      alert("You cannot search for an empty city name!");
    }
  }

  // get data when 'enter' key is pressed after input
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      searchLocationWeather();
    }
  }

  // set date
  const current_date = new Date()
  const days_list = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const months_list = ["Jan", "Feb", "Mar", "Apr", "May", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const selected_day = days_list[current_date.getDay() - 1]
  const selected_day_number = current_date.getDate()
  const selected_month = months_list[current_date.getMonth() + 1]
  const formatted_date = `${selected_day}, ${selected_day_number} ${selected_month}`


  return (
    <div className="container">
      <div className="weather_app">
        <div className="search">
          <div className="search_top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data && data.name}</div>
          </div>
          <div className="search_bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={searchLocationWeather}
            ></i>
          </div>
        </div>
        <div className="weather">
          <img src={sunnyImage} alt="sunny" />
          <div className="weather_type">{data?.weather?.[0]?.main ?? "__"}</div>
          <div className="temp">
            {data?.main?.temp != null ? `${data.main.temp}℃` : "_℃"}
          </div>
        </div>
        <div className="weather_date">
          <p>{formatted_date}</p>
        </div>
        <div className="weather_data">
          <div className="humidity">
            <div className="data_name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">
              {data?.main?.humidity != null ? `${data.main.humidity}%` : "_%"}
            </div>
          </div>
          <div className="wind">
            <div className="data_name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">
              {data?.wind?.speed != null
                ? `${data.wind.speed} km/hr`
                : "_ km/hr"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
