import React, {useState, useEffect} from 'react';
import store from './redux_files/store';
import youtube from './axios_create/youtube.js';
import axios from 'axios';
// import store from './redux_files/store';


const SearchResultPage = () => {
    const [search_result, set_search_result] = useState([]);
    const [youtube_search_result, set_youtube_search_result] = useState([]);
    const [input, setinput] = useState("");
    
    console.log("local Storage = ", JSON.parse(localStorage.getItem("store")).query);
    let query = JSON.parse(localStorage.getItem("store")).query;    
    
    console.log("query = ", query);

    // for the very first time when i arrived at this page
    useEffect(() => {
        setinput(query);
    
        // let's fetch the data using axios
        async function fetchdata(){
            let result = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBCbUkPZaZiw0Wb1neQV_RnIiLEgYCh1Tc&cx=12710e7109467d160&q=${query}`);
            return result;
        }
    
        // handle data
        fetchdata()
            .then(searchdata => {
                console.log(searchdata);
                set_search_result(searchdata.data.items);
            })
            .catch(e => console.error(e));
    
        // now let's fetch some data from the Youtube for the queries
    
        const fetch_youtube_data = async () => {
            const youtube_result = await youtube.get('/search', {
                params: {
                    q: query
                }
            })
            return youtube_result;
        }

        fetch_youtube_data()
            .then(result => {
                console.log(result);
                set_youtube_search_result(result.data.items);
            })
            .catch(error => console.log(error));
        console.log("This is Youtube fetch data modules under useEffect");
    }, [])
   

    // using button from search page i am going to use this
    const fetch_data = async (func_query) =>{
        store.dispatch({
            type: 'update_query',
            payload: {
                query : func_query,
                id: 1
            }
        })
    
        console.log(store.getState());
        // let's update it to the localStorage
        
        localStorage.setItem('store', JSON.stringify(store.getState()));
        console.log(localStorage.getItem('store'));
            
        
        // fetching the search data from the google
        
        let result = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBCbUkPZaZiw0Wb1neQV_RnIiLEgYCh1Tc&cx=12710e7109467d160&q=${func_query}`);
        console.log(result.data);
        set_search_result(result.data.items);
    
        // now let's fetch some data from the Youtube for the queries
    
        const fetch_youtube_data = async () => {
            
        
            const youtube_result = await youtube.get('/search', {
                params: {
                    q: func_query
                }
            })
            return youtube_result;
            
        }
    
        fetch_youtube_data()
            .then(result => {
                // console.log(result);
                set_youtube_search_result(result.data.items);
            })
            .catch(error => console.log(error));
            
    }
    
    return (
    <>
        <div className="topSearchInput">
            <div><input type="text" value={input} onChange={(e) => {setinput(e.target.value)}} id="input_field"/></div>
            <div><button onClick={() => { fetch_data(input) }} id="button1" > Search </button></div>
        </div>
        <div className="categories" >
                <div> All </div>
            </div>
        <hr />
        <div className="main_div">
        
        <div className="resultComp">
            <div className="youtube_slider"  style={{display: 'flex', width: '100%', overflowX: 'scroll'}}>
                {
                    youtube_search_result.map( videos => {
                        return (
                              
                            <div style={{width: '25%', flexShrink: '0', position: 'relative'}}> 
                                <img alt="youtube_thumbnails" src={videos.snippet.thumbnails.medium.url} style={{width: '100%', height: 'auto'}}/>
                                <h2 style={{padding: '1.2rem 1rem 0rem 0rem'}}>{ videos.snippet.title }</h2>
                                <a style={{position: 'absolute', bottom: '0%'}} href={"https://www.youtube.com/embed/" + videos.id.videoId} > Watch </a>
                            </div>
                            
                        );
                    })
                }
            </div>
            
        {
            
            search_result.map((results) => {
                return (
                    <>
                    <a href={`${results.link}`} style={{textDecoration: 'none', color: 'black'}}>
                        <div className="result_divs" style={{border: '1px solid grey', borderRadius: '5px', boxShadow: '1px 1px 5px grey'}}>   
                            <p style={{fontSize: '1.3rem', color: 'green'}}> {results.link} </p>
                            <p style={{fontSize: '2.3rem', color: 'blue', padding: '1rem 0rem'}}> {results.title} </p>
                            <p style={{fontSize: '1.6rem', color: 'grey'}}> {results.snippet} </p>
                        </div>
                    </a>
                    </>);
            })
        }
        </div>
        <div className="side_div"></div>
        </div>

    </>
    );
}

export default SearchResultPage;