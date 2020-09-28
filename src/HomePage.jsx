import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import store from './redux_files/store';

const HomePage = () => {
    const [searchquery, setSeachQuery] = useState("");
    const history = useHistory();

    // console.log(searchquery);
    // console.log(store);

    function search(e){
        store.dispatch({
            type: 'add_query',
            payload: {
                query : searchquery
            }
        })
    
        e.preventDefault();
    
        history.push('/searchbar_with_searchresults');
    } 
    return (    
        <>
            <form>
                <input type="text" id="search_input" value={searchquery} onChange={(e) => {setSeachQuery(e.target.value)}}/>
                <input type="submit" value={"Search"} onClick={search}/>
            </form>
        </> 
    );
}

export default HomePage;