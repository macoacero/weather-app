import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Switch from '@mui/material/Switch';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./forecast.scss"

function Forecast(props) {

    const [checked, setChecked] = useState(false);

    const icon = props.data.length !== 0 ? props.data.current.weather[0].icon : '';
    const imageSrc = `http://openweathermap.org/img/wn/${icon}@4x.png` || null;
    let city = props.data.length !== 0 ? props.data.timezone.split('/') : '';

    const options1 = { weekday: 'long' };
    const options2 = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsDay = { weekday: 'long' };
    const optionsTime = { hour: 'numeric', minute: '2-digit' }

    const [currenDateTime, setCurrenDateTime] = useState(new Date());
    const timezoneOffset = props.data.timezone_offset;

    useEffect(() => {
        let currentTS = props.data.length !== 0 ? props.data.current.dt + (timezoneOffset) : null;
        let currentDate = new Date(currentTS * 1000 + new Date().getTimezoneOffset() * 60000);
        if (props.data.length !== 0) {
            setCurrenDateTime(currentDate);
        }
    }, [props.inputValue, props.data]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <div className='top-container'>
                <Container>
                    <Row className="text-center">
                        <div className='top-forecast'>
                            <div className='dates'>
                                <div className='date1'>
                                    {props.data.length !== 0 ? currenDateTime.toLocaleDateString('es-ES', options1) : ""}
                                </div>
                                <div className='date2'>
                                    {props.data.length !== 0 ? currenDateTime.toLocaleDateString('es-ES', options2) : ""}
                                </div>
                            </div>
                            <div className='city-time'>
                                <div className='city'>
                                    {props.data.length !== 0 ? city[city.length - 1].replace(/[\W_]+/g, ' ') : ''}
                                </div>
                                <div className='time'>
                                    {props.data.length !== 0 ? currenDateTime.toLocaleTimeString([], optionsTime) : ""}
                                </div>
                            </div>
                        </div>
                        <div className='bottom-forecast'>
                            <div className='image'>
                                <img src={imageSrc} alt="" />
                            </div>
                            <div className='temperature'>
                                {props.data.length !== 0 ? `${Math.round(props.data.current.temp)}°` : ''}
                            </div>
                        </div>
                        <div className='description'>
                            {props.data.length !== 0 ? props.data.current.weather[0].description : ''}
                        </div>
                    </Row>
                </Container>
            </div>

            <div className='bottom-container'>
                <Container>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {checked ?
                        <Row className="text-center daily">
                            {props.data.length !== 0 ? props.data.daily.filter(function (value, index) {
                                return index > 0 && index < 5;
                            }).map((item, i) => {

                                const iconDay = props.data.length !== 0 ? item.weather[0].icon : '';
                                const imageSrcDay = `http://openweathermap.org/img/wn/${iconDay}@4x.png` || null;
                                let dailytTS = props.data.length !== 0 ? item.dt + timezoneOffset : null;
                                let dailyDate = new Date(dailytTS * 1000 + new Date().getTimezoneOffset() * 60000)

                                return (
                                    <Col key={i}>
                                        <div>{`${dailyDate.toLocaleDateString('es-ES', optionsDay)}`}</div>
                                        <img src={imageSrcDay} alt="" />
                                        <div>{`${Math.round(item.temp.max)}°`} / {`${Math.round(item.temp.min)}°`}</div>
                                    </Col>
                                )
                            }) : null}
                        </Row>
                        :
                        <Row className="text-center hourly">
                            {props.data.length !== 0 ? props.data.hourly.filter(function (value, index) {
                                return index < 25 && index % 8 === 0;
                            }).map((item, i) => {

                                const iconHour = props.data.length !== 0 ? item.weather[0].icon : ''
                                const imageSrcHou = `http://openweathermap.org/img/wn/${iconHour}@4x.png` || null;
                                let hourlyTS = props.data.length !== 0 ? item.dt + timezoneOffset : null;
                                let hourlyDate = new Date(hourlyTS * 1000 + new Date().getTimezoneOffset() * 60000)

                                return (
                                    <Col key={i}>
                                        <div className='hour-hourly'>{`${hourlyDate.toLocaleTimeString([], optionsTime)}`}</div>
                                        <img src={imageSrcHou} alt="" />
                                        <div>{`${Math.round(item.temp)}°`}</div>
                                    </Col>
                                )
                            }) : null}
                        </Row>
                    }
                </Container>
            </div>
        </>
    );
}

export default Forecast;