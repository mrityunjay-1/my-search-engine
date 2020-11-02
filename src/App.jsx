import React, { useState } from 'react';
import TopSearchDetails from './SearchResultPage';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';

const App = () => {
    const [searchquery, setSearchQuery] = useState("");

    return (
        <>
            <form action="https://my-weather-application2.herokuapp.com">
                <input type="text" value={searchquery} onChange={(e) => { setSearchQuery(e.target.value) }} />
                <input type="submit" value="Search" />
            </form>


        </>);
}

export default App;