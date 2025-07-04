import React, { useEffect, useRef, useState } from "react";
import "./Weather.css"

import clear_icon1 from "../assets/anim_clear.svg";
import cloud_icon1 from "../assets/anim_cloud.svg";
import drizzle_icon1 from "../assets/anim_drizzle.svg";
import rain_icon1 from "../assets/anim_rain.svg";
import snow_icon1 from "../assets/anim_snow.svg";

import { toast } from "react-hot-toast";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import search_icon from "../assets/search.png";

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState({
        humidity: "",
        windSpeed: "",
        temperature: "",
        location: "",
        icon: [] 
    });
    const allIcons = {
        "01d": clear_icon1,
        "01n": clear_icon1,
        "02d": cloud_icon1,
        "02n": cloud_icon1,
        "03d": cloud_icon1,
        "03n": cloud_icon1,
        "04d": drizzle_icon1,
        "04n": drizzle_icon1,
        "09d": rain_icon1,
        "09n": rain_icon1,
        "10d": rain_icon1,
        "10n": rain_icon1,
        "13d": snow_icon1,
        "13n": snow_icon1,
    };
    
    const search = async (city) => {
        if (city === "") {
            toast('Please enter city name!', {
                icon: '👀',
                style: {
                    height: '60px',
                    background: 'linear-gradient(45deg, #2678ea, #020121)',
                    color: '#ffffff',
                    fontSize: '22px'
                }
              });
            return;
        }

        try {              
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                toast('City not found!', {
                    icon: '🚫',
                    style: {
                        height: '60px',
                        background: 'linear-gradient(45deg, #2678ea, #020121)',
                        color: '#ffffff',
                        fontSize: '22px'
                    }
                  });
                return;
            }

            console.log(data);
            const weatherIcon = allIcons[data.weather[0].icon] || clear_icon1;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: weatherIcon 
            });
        } catch (error) {
            setWeatherData({});
            console.log("An error in fetching weather data: ", error);
        }
    }

    useEffect(() => {
        search("Malabe");
    }, []);

  return (
    <div className="weather">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Search" />
            <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
        </div>
        {(weatherData)?<>
            <img src={weatherData.icon} alt="" className="weather-icon"/>
            <p className="temp">{weatherData.temperature}°c</p>
            <p className="location">{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
                </div>
            </div>
        </> : <> </>}

    </div>
  )
};

export default Weather;