import { useRef, useState } from 'react';
import './App.css';
import {useNavigate} from 'react-router-dom'
import ForcastWeather from './pages/ForcastWeather';
import CurrentWeather from './pages/CurrentWeather';

function App() {

  const [currentPage,setCurrentPage] = useState('CURRENT-WEATHER');

  const navigate = (page) => {
    setCurrentPage(page);
  }

  return (
   <>
    <div className='header'>
      <p> { currentPage == 'CURRENT-WEATHER' ? 'Current Weather' : 'Forcast' } </p>
    </div>
    <div>
    <div className='conponent-parent-div'>
      {
        currentPage == 'CURRENT-WEATHER' 
          ? 
        <>
          <CurrentWeather />
        </>
          :
        <>
          <ForcastWeather />
        </>    
      }
    </div>

      {/* <Navigation /> */}
    </div>
    <div className='bottom-tabs'>
      <div className='current-weather-tab' onClick={ ()=>{ navigate('CURRENT-WEATHER') } }> <p>Current weather</p> </div>
      <div className='forcast-tab' onClick={()=>{ navigate('FORCAST') }}> <p>Forcast</p></div>
    </div>
   </>
  );
}

export default App;