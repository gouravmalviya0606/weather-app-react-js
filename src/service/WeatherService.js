import axios from "axios";

const apiKey = '5130dee0b367794af78300e4b48fd3b2';
const apiUrl = 'https://api.openweathermap.org/data/2.5'; 

export const getWeather = (city) => {
    let url = `${apiUrl}/weather?q=${city}&appid=${apiKey}`;
    let res = axios.get(url);
    return res;
}

export const getWeatherForecast = (city) => {
    let url = `${apiUrl}/forecast?q=${city}&appid=${apiKey}`;
    let res = axios.get(url);
    return res;
}