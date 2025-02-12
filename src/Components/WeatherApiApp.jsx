import React, { useEffect, useState } from 'react'
import sun from '../Components/img/sun.png';
import clouds from '../Components/img/clouds.png';
import drizzle from '../Components/img/drizzle.png';
import rain from '../Components/img/rain.png';
import humidityimg from '../Components/img/humidity.png';
import snowy from '../Components/img/snowy.png';
import windimg from '../Components/img/wind.png';
import SearchImg from '../Components/img/search.png';

// https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const WeatherDetails = ({icon, temp, city, country, latitude, longitude, humidity, wind }) => {
    return(
        <div>
            <div className='flex justify-center items-center'>
            <img src={icon} alt="weather images" height="150px" width="150px" className='py-4' />
            </div>
            
            <h1 className='font-bold text-3xl text-center capitalize'>{temp} °C</h1>
            <h1 className='font-bold text-3xl text-center p-3 uppercase text-sky-600'>{city}</h1>
            <h1 className='font-bold text-2xl text-center uppercase'>{country}</h1>
            <div className='flex gap-3 justify-around items-center pt-3'>
                <div className='flex flex-col justify-center items-center gap-2'>
                <h1 className='font-medium text-lg text-center capitalize'>Latitude</h1>
                <span>{latitude}</span> 
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='font-medium text-lg text-center capitalize'>Longitude</h1>
                <span>{longitude}</span>
                </div>
            </div> 
            <div className='flex gap-10 justify-between items-center'>
            <div className='flex flex-col justify-center items-center'>
            <img src={humidityimg} alt="humidity" height="100px" width="100px" className='py-4' />
            <h1 className='font-lg capitalize font-medium'>{humidity} %</h1>
            <h1 className='font-lg capitalize font-medium'>humidity</h1>
            </div>
            <div className='flex flex-col justify-center items-center'>
            <img src={windimg} alt="humidity" height="100px" width="100px" className='py-4' />
            <h1 className='font-lg font-medium'>{wind} km/h</h1>
            <h1 className='font-lg capitalize font-medium'>Wind speed</h1>
            </div>
            </div>
        </div>
    )
}

const WeatherApiApp = () => {
    const [ icon, setIcon ] = useState(sun);
    const [ temprature, setTemprature ] = useState(30);
    const [ city, setCity ] = useState("Chennai");
    const [ country, setCountry ] = useState("IN");
    const [ latitude, setLatitude ] = useState(0);
    const [ longitude, setLongitude ] = useState(0);
    const [ humidity, setHumidity ] = useState(0);
    const [ wind, setWind ] = useState(0);
    const [ citytext, setCityText ] = useState("chennai")
    const [ cityNotFound, setCityNotFound ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    
// https://openweathermap.org/weather-conditions
    const weatherIconMap = {
        "01d": sun,
        "01n": sun,
        "02d": clouds,
        "02n": clouds,
        "03d": drizzle,
        "03n": drizzle,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "010d": rain,
        "010n": rain,
        "013d": snowy,
        "013n": snowy,
    };

    let apikey = "7db7f4dc24f41ff2956b0ddce4ddf5da" // api key from openweather website


    const search = async() =>{
        setLoading(true);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${citytext}&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric` // api url form postman

        try{
            let res = await fetch(url);
            let data = await res.json();
            console.log(data);
            if(data.cod === 404 ){
                console.error("city not found");
                setCityNotFound(true);
                setLoading(false);
                return;  
            }
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemprature(Math.floor(data.main.temp));
            setCity(data.name);
            setCountry(data.sys.country);
            setLatitude(data.coord.lat);
            setLongitude(data.coord.lon);
            const weatherIconCode = data.weather[0].icon;
            setIcon(weatherIconMap[weatherIconCode] || sun )
            setCityNotFound(false);
        }catch(error){
            console.log(error); 
            setError("An error occurred while fetching weather data")
        }finally{
            setLoading(false)

        }
    }
    const handleCity = (e) => {
        setCityText(e.target.value)
    }
    const handlekeydownenter = (e) =>{
        if(e.key == "Enter"){
            search();
        }
    }

    // use-effect
    useEffect(function(){
        search();
    },[]);


  return (
    <div className='flex justify-center items-center bg-sky-50 h-screen'>
        <div className='bg-sky-200 w-full md:w-1/2 xl:w-1/4 justify-center items-center flex p-5 flex-col shadow-md shadow-sky-300'>
        <div className='flex bg-white border border-gray-600 rounded p-1 w-full'>
        <input type="text" placeholder='Search City' className='p-2 border-none outline-none w-full md:flex-1 text-xl' 
        onChange={handleCity} 
        name='citytext' 
        value={citytext} 
        onKeyDown={handlekeydownenter} 
        />
        <img src={SearchImg} alt="search" width="30px" className='m-2' onClick={() => search()} />
        </div>

        {loading && <div>...Loading</div>}
        {error && <div>{error}</div>}
        {cityNotFound && <div className='text-red-600 p-2'>City not found</div>}

        {!loading && !cityNotFound &&
            <WeatherDetails 
            icon={icon} 
            temp={temprature} 
            city={city} 
            country={country}
            latitude={latitude}
            longitude={longitude}
            humidity= {humidity}
            wind= {wind}
            />
        }

        <h1 className='text-sm  p-2 m-3 mt-10'>Desighed by Bharathi</h1>

        </div>
        
        
    </div>
  )
}

export default WeatherApiApp
