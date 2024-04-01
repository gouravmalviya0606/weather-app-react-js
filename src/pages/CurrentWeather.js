import React, { useEffect, useState,useRef } from 'react'
import { getWeather, getWeatherForecast } from '../service/WeatherService';

const CurrentWeather = () => {
  
  const [weatherDetails,setWeatherDetails] = useState([]);
  const [forcastData,setForcastData] = useState([]);  
  const [forcastWeekData,setForcastWeekData] = useState([]);  
  const [currentCity,setCurrentCity] = useState('Indore');
  const [city,setCity] = useState('Indore');

  useEffect(()=>{
    getCurrentWeather(currentCity);
    getCurrentForecast(currentCity);
  },[])

  const getCurrentWeather = async (city) => {
    try{
      let res = await getWeather(city);
      if(res['request']['status'] != 404){
        setWeatherDetails(res['data']);
        setCity(currentCity);
      }
    }
    catch(e){
      console.log('city not found');
    }
  }

  // useEffect(()=>{
  //   console.log(forcastWeekData)
  // },[forcastWeekData])

  const getCurrentForecast = async (city) => {
    try{
      let res = await getWeatherForecast(city);
      if(res['request']['status'] != 404){
        setCity(currentCity);
        const currentDate = new Date().toISOString().slice(0, 10);
        const filteredData = res['data']['list'].filter(data => data.dt_txt.startsWith(currentDate));

        const uniqueDates = [];
        const uniqueDateStrings = new Set();
        res['data']['list'].forEach(element => {
          const date = element['dt_txt'].slice(0, 10);
          if (!uniqueDateStrings.has(date)) {
            uniqueDateStrings.add(date);
            uniqueDates.push(element);
          }
        });

        setForcastWeekData(uniqueDates);
        console.log(forcastWeekData);
        setForcastData(filteredData);
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const getImageUrl = () => {
    return `http://openweathermap.org/img/w/${weatherDetails['weather'][0].icon}.png`
  }

  const getImageUrlForcast = (img) => {
    return `http://openweathermap.org/img/w/${img}.png`
  }

  const handleChange = (e) => {
    setCurrentCity(e.target.value);
  }
  return (
    <>
      <div className='search-city'>
        <input type="text" name="" id="" placeholder='Search City' onChange={ (e)=>{ handleChange(e) } } />
        <button type="button" onClick={ ()=>{ getCurrentWeather(currentCity); getCurrentForecast(currentCity) } }> search </button>
      </div>
      {
        weatherDetails.length == 0
          ?
        <>
          <div className='loader'> </div>
        </>  
          :
        <>
          <div className='current-weather-card'>
            <h4 className='date'>{ new Date().toDateString() }</h4>
            <h1>{city}</h1>
            <div className='temp-div'>
              <img src={ getImageUrl() } alt="" /> <p>{ Math.floor(weatherDetails.main.temp - 273.15) }°C</p>
            </div>
            <h1>Weather Details</h1>
            <p> <span className='details-title'> Temperature: </span> <span className='details-data'> { Math.floor(weatherDetails.main.temp - 273.15) }°C</span></p>
            <p><span className='details-title'>Weather Description: </span> <span className='details-data'> { weatherDetails.weather[0].description }</span></p>
            <p><span className='details-title'>Humidity: </span> <span className='details-data'> { weatherDetails.main.humidity }</span></p>
          </div>
          <div className='current-weather-forcast-card' >
            {
              forcastData.map((data)=>{
                return (
                  <>
                    <div className='forcast-today-main-div'>
                      <div>{ data['dt_txt'].slice(11, 16) }</div>
                      <img src={ getImageUrlForcast(data['weather'][0]['icon']) }/> 
                      <div>{ Math.floor(data['main']['temp'] - 273.15) }°C</div>
                    </div>
                  </>
                )
              })
            }
          </div>
          <div className='forcast-week-list'>
            {
              forcastWeekData.map((element)=>{
                return (<>
                  <div className='forcast-week-today'>
                    <div> Date </div>
                    <div> img </div>
                    <div> °C </div>
                  </div>
                </>)
              })
            }
          </div>
        </>  
      }
    </>
  )
}

export default CurrentWeather