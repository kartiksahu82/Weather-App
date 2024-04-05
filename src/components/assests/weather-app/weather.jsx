import React, { useState } from "react";
import "./weather.css";
import clear_icon from "../clear.png";
import cloud from "../cloud.png";
import drizzle from "../drizzle.png";
import humidity from "../humidity.png";
import rain from "../rain.png";
import search from "../search.png";
import snow from "../snow.png";
import wind from "../wind.png";

const Weather = () => {
  const api = "08eadbc5406f6a0bfa557ab324385067";
  const [wicon, seticon] = useState(clear_icon);
  const search1 = async () => {
    const elm = document.getElementsByClassName("sn");
    if (elm[0].value === 0) {
      seticon("");
    } else {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${elm[0].value}&units=metric&appid=${api}`;
      const responce = await fetch(url);
      const data = await responce.json();

      const temp = document.getElementsByClassName("temp");
      const city = document.getElementsByClassName("city");
      const hum = document.getElementsByClassName("hum");
      const wind = document.getElementsByClassName("wind");

      temp[0].innerHTML = Math.floor(data.main.temp) + "°C";
      city[0].innerHTML = data.name;
      hum[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";

      if (data.weather[0].icon === "04d" || data.weather[0].icon === "03d") {
        seticon(cloud);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "	10n"
      ) {
        seticon(rain);
      } else if (
        data.weather[0].icon === "11d" ||
        data.weather[0].icon === "11n"
      ) {
        seticon(drizzle);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        seticon(snow);
      } else {
        seticon(cloud);
      }
    }
  };

  return (
    <div className="containor">
      <div className="none">
        
        <h1>Weather App</h1>
      </div>
      <div className="top">
        <input type="text" className="sn" placeholder="City Name" />
        <div className="search" onClick={() => search1()}>
          <img src={search} alt="" />
        </div>
      </div>
      <div className="cloud">
        <img src={wicon} alt="" />
      </div>
      <div className="temp">24° C</div>
      <div className="city">London</div>
      <div className="bot">
        <div className="last">
          <div className="img1" id="mid">
            <img src={humidity} alt="" />
            <div className="hum-name">Humdity</div>
          </div>
          <div className="hum">64 %</div>
        </div>
        <div className="last">
          <div className="img1" id="mid">
            <img src={wind} alt="" />
            <div className="wind-name">Wind Speed</div>
          </div>

          <div className="wind">45 km/hr</div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
