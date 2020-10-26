import React, { useState, useEffect } from 'react';
import store from './redux_files/store';
import youtube from './axios_create/youtube.js';
import axios from 'axios';
import './css/css_for_search_result_page.css';
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
        async function fetchdata() {
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
    const fetch_data = async (func_query) => {
        store.dispatch({
            type: 'update_query',
            payload: {
                query: func_query,
                id: 1
            }
        })

        console.log(store.getState());
        // let's update it to the localStorage

        localStorage.setItem('store', JSON.stringify(store.getState()[0]));
        console.log(localStorage.getItem('store'));


        // fetching the search data from the google

        let result = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyBCbUkPZaZiw0Wb1neQV_RnIiLEgYCh1Tc&cx=12710e7109467d160&q=${func_query}`);
        //console.log(result.data);
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
            <span className="logo1" style={{ fontSize: '3rem', width: '100%', fontWeight: 'bold', color: 'grey', textAlign: 'center' }}> searchIn.com </span>
            <div className="topSearchInput">
                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}> <span className="logo2" style={{ fontSize: '3rem', width: '30%', fontWeight: 'bold', color: 'grey' }}> SearchIn.com </span> <input type="text" value={input} onChange={(e) => { setinput(e.target.value) }} id="input_field" /></div>
                <div class="search_button" style={{ width: '40%' }}><button onClick={() => { fetch_data(input) }} id="button1" > Search </button></div>
            </div>
            <div className="categories" >
                <div>  <a href={`https://picsum.photos`} > All  </a> </div>
                <div>  <a href={`https://picsum.photos`} > search  </a>  </div>
                <div>  <a href={`http://localhost:3000/videos`} > videos  </a>  </div>
                <div>  <a href={`https://picsum.photos`} > news  </a>  </div>
                <div>  <a href={`https://picsum.photos`} > map  </a>  </div>

            </div>
            <hr />
            <div className="main_div">

                <div className="resultComp">
                    <div className="youtube_slider" style={{ display: 'flex', width: '100%', height: '40%', overflowX: 'scroll', padding: '1rem 0rem' }}>
                        {
                            youtube_search_result.map(videos => {
                                return (

                                    <div className="youtube_videos_boxes">
                                        <img alt="youtube_thumbnails" src={videos.snippet.thumbnails.medium.url} style={{ width: '100%', height: 'auto' }} />
                                        <h2 style={{ padding: '1.2rem 1rem 0rem 1rem' }}>{videos.snippet.title}</h2>
                                        <a style={{ position: 'absolute', bottom: '3%', right: '10%', fontSize: '1.8rem', textDecoration: 'none' }} href={"https://www.youtube.com/embed/" + videos.id.videoId} > Watch </a>
                                    </div>

                                );
                            })
                        }
                    </div>

                    {

                        search_result.map((results) => {
                            return (
                                <>
                                    <a href={`${results.link}`} className="anchortags" style={{ textDecoration: 'none', color: 'black' }}>
                                        <div className="result_divs" style={{ border: '1px solid lightgrey', borderRadius: '5px', boxShadow: '0.5px 0.5px 3px lightgrey', overflow: 'hidden' }}>
                                            <p style={{ fontSize: '1.2rem', color: 'green' }}> {results.link} </p>
                                            <p style={{ fontSize: '1.9rem', color: 'blue', padding: '1rem 0rem' }}> {results.title} </p>
                                            <p style={{ fontSize: '1.4rem', color: 'grey' }}> {results.snippet} </p>
                                        </div>
                                    </a>
                                </>);
                        })
                    }
                </div>
                <div className="side_div"></div>
            </div>



            <div> This is Going to be the Footer. </div>

        </>
    );
}

export default SearchResultPage;