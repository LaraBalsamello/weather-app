import React from "react";
import "../Loader/Loader.scss";

const Loader = () => {
    return (
        <div className="spinner-container"  >
            <div className="spinner-custom"></div>
            <div className="spinner-para">
                <p>Loading</p><p className="animate-p">.</p><p className="animate-x">.</p><p className="animate-y">.</p>
            </div>
        </div>)
};

export default Loader;