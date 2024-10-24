import { useEffect, useState } from 'react'
import Variable from '../Variable/Variable';



import './Temperatures.css';


function Temperatures({ name, initCelsius = 0, initFahrenheit = 32, initKelvin = 273.15 }) {
    const [celsius, setCelsius] = useState(initCelsius);
    const [fahrenheit, setFahrenheit] = useState(initFahrenheit);
    const [kelvin, setKelvin] = useState(initKelvin);

    const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
    const celsiusToKelvin = (celsius) => celsius + 273.15;
    const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
    const kelvinToCelsius = (kelvin) => kelvin - 273.15;

    useEffect(() => {
        setFahrenheit(celsiusToFahrenheit(celsius));
        setKelvin(celsiusToKelvin(celsius));
    }, [celsius]);

    useEffect(() => {
        setCelsius(fahrenheitToCelsius(fahrenheit));
    }, [fahrenheit]);

    useEffect(() => {
        setCelsius(kelvinToCelsius(kelvin));
    }, [kelvin]);



    return(
        <div className='temperatures-container'>
            <h3 className='temperatures-title'>{name || 'TEMPERATURE'}</h3>
            <h3 className='temperatures-display'>
                <span className='badge bg-primary'>{celsius.toFixed(2)}&deg;C</span>
                <span className='badge bg-primary'>{fahrenheit.toFixed(2)}&deg;F</span>
                <span className='badge bg-primary'>{kelvin.toFixed(2)}&deg;K</span>
                </h3>
            <div className='temperatures-variables'>
                <Variable name={'Celsius'} value={celsius} setValue={setCelsius}/>
                <Variable name={'Fahrenheit'} value={fahrenheit} setValue={setFahrenheit}/>
                <Variable name={'Kelvin'} value={kelvin} setValue={setKelvin}/>

            </div>
        </div>
    )
}

export default Temperatures;