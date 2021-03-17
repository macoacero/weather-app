import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Forecast from '../Forecast';
import Clock from '../Clock'


function WeatherForm() {

    const [lat, setLat] = useState(4.6097100);
    const [lon, setLon] = useState(-74.0817500);
    const [data, setData] = useState ([]);


    function handleLat(e){
        setLat(e.target.value);
    }
    function handleLon(e){
        setLon(e.target.value);
    }

    function handleBingMap(lat,lon){
        new window.Microsoft.Maps.Map('#myMap', {
            credentials: 'AqZn27tMZySIdRcojZAGoF8UVST7QAAzflyLsn6Nh36dH7o6FIjvAz2YVwhWGQuK',
            center: new window.Microsoft.Maps.Location(lat, lon),
            mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
            zoom: 10
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        const apiKey = '2c268493e8709183220f54e0bda0979f';
        const latitude = lat;
        const longitude = lon;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        axios.get(url)
        .then(res => {
            const data = res.data;
            setData(data);
            handleBingMap(latitude, longitude)
            console.log('data', data)
        })
    }

    const stylesMap = {
        position:'relative',
        width:'600px',
        height:'400px'
    }

    return(
        <div className="container">
            <form className="columns" onSubmit={handleSubmit}>
                <div className="column">
                    <TextField type="number" label="Latitude" value={lat} onChange={handleLat}/>
                </div>
                <div className="column">
                    <TextField type="number" label="Longitude" value={lon} onChange={handleLon}/>
                </div>
                <div className="column">
                    <Button type="submit" variant="contained" color="primary">Send</Button>
                </div>
            </form>
            <Clock data={data}/>
            <Forecast data={data}/>
            <div id="myMap" style={stylesMap}></div>
        </div>
    );
}

export default WeatherForm;