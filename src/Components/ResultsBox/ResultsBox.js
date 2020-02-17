import React from "react";
import "../ResultsBox/ResultsBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faCloudSun,
    faCloud,
    faCloudShowersHeavy,
    faCloudSunRain,
    faCloudRain,
    faSnowflake,
    faSmog,
    faMoon,
    faCloudMoon,
    faCloudMoonRain,
    faHeart
}
    from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";

const ResultsBox = (props) => {
    const evaluateWind = (weather) => {
        let windDirection = "";
        if (weather.wind.deg > 15 && weather.wind.deg < 75) {
            windDirection = "NE";
        } else if (weather.wind.deg > 105 && weather.wind.deg < 165) {
            windDirection = "SE";
        } else if (weather.wind.deg > 195 && weather.wind.deg < 255) {
            windDirection = "SO";
        } else if (weather.wind.deg > 285 && weather.wind.deg < 345) {
            windDirection = "NO";
        } else if (weather.wind.deg >= 0 && weather.wind.deg <= 15) {
            windDirection = "N";
        } else if (weather.wind.deg >= 75 && weather.wind.deg <= 105) {
            windDirection = "E";
        } else if (weather.wind.deg >= 165 && weather.wind.deg <= 195) {
            windDirection = "S";
        } else if (weather.wind.deg >= 255 && weather.wind.deg <= 285) {
            windDirection = "O";
        }
        return windDirection;
    }

    const evaluateCondition = (weather) => {
        let iconWeather = "";
        if (weather.weather[0]["icon"].includes("n")) {
            if (weather.weather[0]["icon"].includes("01")) {
                iconWeather = faSun;
            } else if (weather.weather[0]["icon"].includes("02")) {
                iconWeather = faCloudSun;
            } else if (weather.weather[0]["icon"].includes("03") || weather.weather[0]["icon"].includes("04")) {
                iconWeather = faCloud;
            } else if (weather.weather[0]["icon"].includes("09")) {
                iconWeather = faCloudRain;
            } else if (weather.weather[0]["icon"].includes("10")) {
                iconWeather = faCloudSunRain;
            } else if (weather.weather[0]["icon"].includes("11")) {
                iconWeather = faCloudShowersHeavy;
            } else if (weather.weather[0]["icon"].includes("13")) {
                iconWeather = faSnowflake;
            } else if (weather.weather[0]["icon"].includes("50")) {
                iconWeather = faSmog;
            }
        } else {
            if (weather.weather[0]["icon"].includes("01")) {
                iconWeather = faMoon;
            } else if (weather.weather[0]["icon"].includes("02")) {
                iconWeather = faCloudMoon;
            } else if (weather.weather[0]["icon"].includes("03") || weather.weather[0]["icon"].includes("04")) {
                iconWeather = faCloud;
            } else if (weather.weather[0]["icon"].includes("09")) {
                iconWeather = faCloudRain;
            } else if (weather.weather[0]["icon"].includes("10")) {
                iconWeather = faCloudMoonRain;
            } else if (weather.weather[0]["icon"].includes("11")) {
                iconWeather = faCloudShowersHeavy;
            } else if (weather.weather[0]["icon"].includes("13")) {
                iconWeather = faSnowflake;
            } else if (weather.weather[0]["icon"].includes("50")) {
                iconWeather = faSmog;
            }
        }
        return iconWeather;
    }

    const handleClick = (weather) => {
        props.click(weather);
    }

    let toRenderArray = [];
    for (let i = 0; i < props.results.length; i++) {
        let result = props.results[i];
        let weather = result;
        let city;
        let windDirec = evaluateWind(weather);
        let iconW = evaluateCondition(weather);
        let classesFav = ["tiny-heart-container", "opacity"];
        if (weather.saved) {
            classesFav = classesFav.filter(e => e !== "opacity");
        } else {
            classesFav.push("opacity");
        }
        let heart = (
            <div className={classesFav.join(" ")} onClick={() => handleClick(weather)}>
                <FontAwesomeIcon className="fontawesome-icon small-icon" icon={faHeart} />
            </div>)
        if (props.dontShowHeart === true) {
            heart = null;
        }
        city = (
            <div className="results-box" key={weather.id + "1"}>
                {heart}
                <h2 key={weather.id}>{weather.name}</h2>
                <div className="box-head-container">
                    <div className="temp-container">
                        <FontAwesomeIcon className="fontawesome-icon" icon={iconW} />
                        <b className="temp">{Math.round(weather.main.temp)}°</b>
                    </div>
                    <p>ST: <b>{Math.round(weather.main.feels_like)}°</b></p>
                    <p>Viento: <b>{weather.wind.speed} km/h </b>|<b> {windDirec}</b></p>
                </div>
            </div>
        )
        toRenderArray.push(city);
    }

    if (props.loading) {
        toRenderArray.push(<Loader key="loader" />)
    }

    if (toRenderArray.length === 0) {
        toRenderArray.push(<div key="noRes" className="container-to-show"><p>Tus resultados se mostrarán aquí</p></div>)
    }

    return (
        <div className="results-box-container">
            {toRenderArray}
        </div>
    );
}

export default ResultsBox; 