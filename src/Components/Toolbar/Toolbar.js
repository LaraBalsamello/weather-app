import React from "react";
import "../Toolbar/Toolbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const toolbar = (props) => {
    let linkToShow = null;
    if (props.showFav === true) {
        linkToShow = (
            <Link to={{
                pathname: "/ciudades-favoritas",
                state: {
                    savedCity: props.weatherSaved
                }
            }} className="clean-up" >
                <p>Ciudades favoritas</p><FontAwesomeIcon className="fontawesome-icon heart-icon" icon={faHeart} />
            </Link>)
    } else {
        linkToShow = <Link className="clean-up" to="/inicio">
            <p>Inicio</p><FontAwesomeIcon className="fontawesome-icon heart-icon" icon={faHome} />
        </Link>
    }
    return (
        <div className="toolbar-container">
            <div className="title-app-container">
                <h1>Weather App</h1>
            </div>
            <div className="fav-container">
                {linkToShow}
            </div>
        </div>

    )
};

export default toolbar; 