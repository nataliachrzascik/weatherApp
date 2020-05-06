import React from "react";
import Weather from './component/weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './component/form';

const API_key = "429736441cf3572838aa10530929f7cd";
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            feels: undefined,
            wind: undefined,
            humidity: undefined,
            pressure: undefined,
            direct: undefined,
            description: "",
            sunrise: undefined,
            error: false

        }
        this.weatherIcon = {
            Thunderstrom: "fa-poo-storm",
            Drizzle: "fa-cloud-rain",
            Rain: "fa-cloud-showers-heavy",
            Snow: "fa-snowflake",
            Mist: "fa-smog",
            Smoke: "fa-smog",
            Haze: "fa-smog",
            Dust: "fa-smog",
            Fog: "fa-smog",
            Sand: "fa-smog",
            Ash: "fa-smog",
            Squall: "fa-wind",
            Tornado: "fa-wind",
            Clear: "fa-sun",
            Clouds: "fa-cloud",
            Atmosphere: "fa-smog"
        }
    }
    calCelsius(temp) {
        let cell = Math.floor(temp - 273.15);
        return cell;
    }
    calTime(sunTime) {
        let date = new Date(sunTime * 1000);
        let utcString = date.toUTCString();
        let time = utcString.slice(-11, -7);
        return time;
    }
    get_WeatherIcon(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({
                    icon: this.weatherIcon.Thunderstrom
                });
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({
                    icon: this.weatherIcon.Drizzle
                });
                break;
            case rangeId >= 500 && rangeId <= 531:
                this.setState({
                    icon: this.weatherIcon.Rain
                });
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({
                    icon: this.weatherIcon.Snow
                });
                break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({
                    icon: this.weatherIcon.Atmosphere
                });
                break;
            case rangeId === 800:
                this.setState({
                    icon: this.weatherIcon.Clear
                });
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({
                    icon: this.weatherIcon.Clouds
                });
                break;
            default:
                this.setState({
                    icon: this.weatherIcon.Clouds
                });

        }
    }
    getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        const country = event.target.elements.country.value;

        if (city && country) {
            const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)
            //console.log(api_call.status);
            if (api_call.status !== 404) {
                const response = await api_call.json();

                this.setState({
                    city: `${response.name},${response.sys.country}`,
                    celsius: this.calCelsius(response.main.temp),
                    temp_max: this.calCelsius(response.main.temp_max),
                    temp_min: this.calCelsius(response.main.temp_min),
                    feels: this.calCelsius(response.main.feels_like),
                    wind: response.wind.speed,
                    humidity: response.main.humidity,
                    pressure: response.main.pressure,
                    direct: response.wind.deg,
                    description: response.weather[0].description,
                    sunrise: `${this.calTime(response.sys.sunrise)}am/${this.calTime(response.sys.sunset)}pm`,
                    error: false

                })
                this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
            }
            else {
                this.setState({ error: true })
            }

        }
        else {
            this.setState({ error: true })
        }

    }
    render() {
        return (
            <>
                <div className="stars" />
                <div className="glow" />
                <div className="App">
                    <Form loadweather={this.getWeather} error={this.state.error} />
                    <Weather
                        city={this.state.city}
                        country={this.state.country}
                        temp_celsius={this.state.celsius}
                        temp_max={this.state.temp_max}
                        temp_min={this.state.temp_min}
                        description={this.state.description}
                        wind={this.state.wind}
                        weatherIcon={this.state.icon}
                        feels={this.state.feels}
                        humidity={this.state.humidity}
                        pressure={this.state.pressure}
                        direct={this.state.direct}
                        sunrise={this.state.sunrise}
                        icon={this.state.icon}
                    /></div>
            </>
        )
    }
}

export default App;