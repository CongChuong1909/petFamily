import moment from "moment";
import React, { useEffect, useState } from "react";

import WeatherLoading from "../Loading/WeatherLoading";
import useDebounce from "~/Hooks/useDebounce";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const initWeather = {
    base: "",
    clouds: { all: 0 },
    cod: 0,
    coord: { lon: 106.6667, lat: 10.75 },
    dt: 0,
    id: 0,
    main: {
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
    },
    name: "Ho Chi Minh City",
    sys: {
        type: 1,
        id: 9314,
        country: "VN",
        sunrise: 1654554620,
        sunset: 1654600450,
    },
    timezone: 25200,
    visibility: 10000,
    weather: [
        {
            description: "",
            icon: "",
            id: 0,
            main: "",
        },
    ],
    wind: { speed: 0, deg: 0 },
};

const Weather = () => {
    const dark = false;
    const [cityName, setCityName] = useState("Ho Chi Minh");

      const weatherFetch = useQuery({
        queryKey: ["weather", cityName],
        queryFn: async () => {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d297be27f6f5541f0abd907338ca3f0a&units=metric`,
            );
            // console.log(res);
            return res.data;
        },
    });
    // weatherFetch.isSuccess && console.log(weatherFetch.data);
    return (
        <>
            {
                
                weatherFetch.isLoading ? <WeatherLoading/> :
                <div className="weather-widget low-opacity bluesh">
                    <div>
                    <div
                        className="bg-image"
                        style={{ backgroundImage: `url("https://wpkixx.com/html/pitnik/images/resources/weather.jpg")`}}
                    ></div>
                    <span className="refresh-content">
                        <i className="fa fa-refresh"></i>
                    </span>
                    <div className="weather-week">
                        <div className="icon sun-shower">
                            <div className="cloud"></div>
                            {weatherFetch.data.weather[0].main !== 'Rain' && 
                            <div className="sun">
                                <div className="rays"></div>
                            </div>}
                            
                            {weatherFetch.data.weather[0].main === 'Rain' && <div className="rain"></div>}
                        </div>
                    </div>
                    </div>
                    <div className="weather-infos">
                        <span className="weather-tem">{Math.round(weatherFetch.data.main.temp)}</span>
                        <h3>
                            {weatherFetch.data.name}<i>Giống như {Math.round(weatherFetch.data.main.feels_like)} độ C</i>
                        </h3>
                        <div className="weather-date skyblue-bg">
                            <span className="bg-[#fa6342]">
                            {moment().format('MMM')}<strong>{moment().format('D')}</strong>
                            </span>
                        </div>
                    </div>
                </div>
            }
        </>
        
    );
};

export default Weather;
