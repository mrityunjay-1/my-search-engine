import React, {useState, useEffect} from 'react';
import axios from 'axios';
import store from './redux_files/store';


const SearchResultPage = () => {
    const [search_result, set_search_result] = useState([]);
    const [input, setinput] = useState("");
    useEffect(() => {
        async function fetchdata(){
            let result = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBCbUkPZaZiw0Wb1neQV_RnIiLEgYCh1Tc&cx=12710e7109467d160&q=${store.getState()[0].query}`);
            return result;
        }
    
        fetchdata()
            .then(searchdata => {
                console.log(searchdata);
            })
            .catch(e => console.error(e));
    }, [])
    
    
    

    
    const fetch_data = async (query) =>{
        let result = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBCbUkPZaZiw0Wb1neQV_RnIiLEgYCh1Tc&cx=12710e7109467d160&q=${query}`);
        console.log(result.data);
        //set_search_result(Object.values(result.data));
            
    }
     
    
    return (
    <>
        <input type="text" value={input} onChange={(e) => {setinput(e.target.value)}} />
        <button onClick={() => { fetch_data(input) }} id="button1"> Get Result </button>
        <h1> {store.getState()[0].query} </h1>
        <div>
        {
            search_result.map((results) => {
                return (
                    <>
                    <a href={`${results.url}`}>
                        <div style={{border: '1px solid grey', borderRadius: '5px', boxShadow: '1px 1px 5px grey'}}> 
                            <h3> {results.title} </h3>
                            <p> {results.url} </p>
                            <p> {results.snippet} </p>
                        </div>
                    </a>
                    </>);
            })
        }
        </div>
 
    </>
    );
}

export default SearchResultPage;