import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from './redux_files/store';
import './css/css_for_homepage.css';

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
                        <div className="logo"> <img src="https://examscuriosity.000webhostapp.com/images/swachh-bharat-abhiyan.jpg" style={{ width: '200px', height: 'auto' }} /> </div>
                        <div className="contain-input-tags">

                            <div style={{ width: '70%' }}>
                                <input type="text" id="search_input" value={searchquery} onChange={(e) => { setSeachQuery(e.target.value) }} />
                            </div>
                            <div style={{ width: '30%' }}>
                                <input type="submit" value={"Search"} onClick={search} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default HomePage;