import React, { useState } from "react";
import "../SearchBox/SearchBox.scss";


const SearchBox = () => {
    const [valueInput] = useState();

    const searchHandler = (event) => {
        console.log(event)
    }
    return (
        <div className="search-box">
            <label>Search a city!</label>
            <input type="text" value={valueInput} onChange={searchHandler}></input>
        </div>

    )
};

export default SearchBox; 