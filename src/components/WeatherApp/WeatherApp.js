import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Forecast from '../Forecast/Forecast';
import { usePosition } from '../../hooks/usePosition/usePosition';
import ComboBox from '../ComboBox/ComboBox';
import { capitals } from "../../assets/capitals";

function WeatherForm({ watch, settings }) {

    const {
        latitude,
        longitude,
        error,
    } = usePosition(watch, settings);

    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [newLatitude, setNewLatitude] = useState();
    const [newLongitude, setNewLongitude] = useState();


    const loader = !latitude && !error ? (
        <>
            <div>Trying to fetch location...</div>
            <br />
        </>
    ) : null;

    useEffect(async () => {
        setNewLatitude(latitude);
        setNewLongitude(longitude);
    }, [latitude, longitude]);

    useEffect(async () => {
        const apiKey = 'b9d0e422bcd80c9c8129da3e116476e1';
        const lang = "es"
        await axios({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${newLatitude}&lon=${newLongitude}&lang=${lang}&units=metric&appid=${apiKey}`,
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [newLatitude, newLongitude, setData])

    useEffect(() => {
        capitals.sort((a, b) => a.label.localeCompare(b.label))
        const currentCity = capitals.filter((item) => {
            return item.label === inputValue;
        })
        setNewLatitude(currentCity.length === 0 ? "" : currentCity[0].latitude);
        setNewLongitude(currentCity.length === 0 ? "" : currentCity[0].longitude);
    }, [inputValue]);

    const comboChange = ((event, newInputValue) => {
        setInputValue(newInputValue);
    });

    console.log(data)


    return (
        <>
            {loader}
            <Forecast
                data={data}
                inputValue={inputValue}
            />
            <ComboBox
                onChange={comboChange}
                inputValue={inputValue}
                capitals={capitals}
            />
        </>
    );
}

export default WeatherForm;