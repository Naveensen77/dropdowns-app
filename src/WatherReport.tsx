import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface WeatherResData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { 
    description: string;main: string}[];
  wind: { speed: number };
  sys: {country: string}
}

const WatherReport: React.FC = () => {
  debugger;
  const [weatherData, setWeatherData] = useState<WeatherResData | null>(null);
  const [inputCity, setinputCity] = useState<string | null>(null);

  const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
  debugger;
  function Getdata() {
    debugger;
    if (inputCity) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          debugger;
          setWeatherData(response.data);
        })
        .catch((error) => {
            alert("Data Not Found")
            console.error("Error fetching weather data:", error);
          });
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-bg-secondary  p-3">Wather Report</h5>
        <div className="row">
          <div className="col-md-3">
            <input
              className="form-control"
              onChange={(e) => setinputCity(e.target.value)}
            ></input>
          </div>
          <div className="col-md-3">
            <button className="btn btn-outline-primary" onClick={Getdata}>
              Search
            </button>
          </div>
        </div>
        <table className="table table-hover mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">country: {weatherData?.sys.country}</th>
              <th scope="col">
                temp:{" "}
                {weatherData
                  ? `${Math.round(weatherData?.main.temp)} °C`
                  : "--"}
              </th>
              <th scope="col">
                humidity:{" "}
                {weatherData
                  ? `${Math.round(weatherData?.main.humidity)} %`
                  : "--"}
              </th>
              <th scope="col">
                description: {weatherData?.weather[0].description}
              </th>
              <th scope="col">
                cloud: {weatherData?.weather[0].main}
              </th>
              <th scope="col">
                speed:{" "}
                {weatherData
                  ? `${Math.round(weatherData?.wind.speed)} km/h`
                  : "--"}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};
export default WatherReport;
