import React from 'react';

function Forecast(props) {

    const icon = props.data.length !== 0 ? props.data.weather[0].icon : '';
    const imageSrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    return(
        <div className="container">
            <div className="columns">
                <div className="column vertical-align">
                    City: {props.data.length !== 0 ? props.data.name : ''}
                </div>
                <div className="column vertical-align">
                    Description: {props.data.length !== 0 ? props.data.weather[0].description : ''}
                    <img src={imageSrc} alt=""/>
                </div>
                <div className="column vertical-align">
                    Temperature: {props.data.length !== 0 ? props.data.main.temp : ''}
                </div>
            </div>
        </div>
    );
}

export default Forecast;