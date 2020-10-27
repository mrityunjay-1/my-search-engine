import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from './redux_files/store';
import './css/css_for_homepage.css';
import logo from './logo.png';
import SearchIcon from '@material-ui/icons/Search';

const HomePage = () => {
    const [searchquery, setSeachQuery] = useState("");
    const history = useHistory();

    // console.log(searchquery);
    // console.log(store);

    function search(e) {

        if (searchquery === "") {
            return false;
        }


        store.dispatch({
            type: 'add_query',
            payload: {
                query: searchquery
            }
        })

        console.log("store: ", store.getState());
        if (typeof Storage !== undefined) {
            localStorage.setItem("store", JSON.stringify(store.getState()[0]));
        }
        else {
            console.log("Failed, Browser does not support this feature.");
        }

        e.preventDefault();

        history.push('/searchbar_with_searchresults');
    }
    return (
        <>
            <div className="container-all">
                <form>
                    <div className="container-1">
                        <div className="logo"> <center><img className="logo_here" alt="logo" src={logo} style={{ width: '50%', height: 'auto' }} /> </center> </div>
                        <div className="contain-input-tags">

                            <div style={{ width: '71%' }}>
                                <input type="text" id="search_input" placeholder="ex. Tesla.Inc" value={searchquery} onChange={(e) => { setSeachQuery(e.target.value) }} />
                            </div>
                            <div style={{ width: '9%' }}>
                                <button class="homepage_button" type="submit" onClick={search} > <SearchIcon fontSize="large" /> </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default HomePage;