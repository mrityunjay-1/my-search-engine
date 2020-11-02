import React, { useState, useEffect } from 'react';
import store from './redux_files/store';
import youtube from './axios_create/youtube.js';
import axios from 'axios';
import FeedbackPage from './FeedbackPage';
import Footer from './Footer';
import './css/css_for_search_result_page.css';
import logo2 from './logo2.png';
//import TopSearchElements from './TopSearchElements.js';
// import store from './redux_files/store';


const SearchResultPage = () => {
    const [search_result, set_search_result] = useState([]);
    const [youtube_search_result, set_youtube_search_result] = useState([]);
    const [input, setinput] = useState("");
    const [wikipedia_result, set_wikipedia_result] = useState("");

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



        // fething data for the position of wikipedia           SIDE-DIV

        fetch(`http://localhost:8080/wikipedia/${query}`)
            .then(response => response.text())
            .then((text_result) => {
                if (text_result !== "") {
                    document.getElementById("side_div_wikipedia").style.display = "flex";
                }
                set_wikipedia_result(text_result)
            })
            .catch(error => console.log(error));

    }, [query])


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

        // fetch(`http://localhost:8080/wikipedia/${query}`)
        //     .then(response => response.text())
        //     .then(text_result => set_wikipedia_result(text_result))
        //     .catch(error => console.log(error));

        fetch(`http://localhost:8080/wikipedia/${func_query}`)
            .then(response => response.text())
            .then((text_result) => {
                if (text_result !== "") {
                    document.getElementById("side_div_wikipedia").style.display = "flex";
                }
                set_wikipedia_result(text_result)
            })
            .catch(error => console.log(error));

    }

    return (
        <>
            <center><img className="logo1" src={logo2} alt="logo" style={{ maxWidth: '60%', padding: '1rem' }} /></center>
            <div className="topSearchInput">
                <div className="topSearchInput-child1"> <img className="logo2" src={logo2} alt="logo" style={{ maxWidth: '30%', padding: '1rem' }} /> <input type="text" style={{ width: '100%' }} value={input} onChange={(e) => { setinput(e.target.value) }} id="input_field" /></div>
                <div className="search_button" ><button onClick={() => { fetch_data(input) }} id="button1" > Search </button></div>
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
                                        <h2 style={{ fontSize: '1.2rem', padding: '1.2rem 1rem 0rem 1rem' }}>{videos.snippet.title}</h2>
                                        <a rel="noopener noreferrer" style={{ position: 'absolute', bottom: '3%', right: '10%', fontSize: '1.8rem', textDecoration: 'none' }} href={"https://www.youtube.com/embed/" + videos.id.videoId} target="_blank"> Watch </a>
                                    </div>

                                );
                            })
                        }
                    </div>
                    <FeedbackPage />
                    <div> <button onClick={() => { document.querySelector("#feedback-container").style.display = "flex"; }} style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}> Give Feedback / Report Issues </button></div>

                    {

                        search_result.map((results) => {
                            return (
                                <>
                                    <a rel="noopener noreferrer" target="_blank" href={`${results.link}`} className="anchortags" style={{ textDecoration: 'none', color: 'black' }}>
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
                <div className="side_div" >
                    <div id="side_div_wikipedia" style={{ display: 'none', flexGrow: '1', overflowX: 'hidden', overflowY: 'scroll' }}> <p> {wikipedia_result} </p> </div>
                    <div id="side_div_wikipedia" style={{ display: 'none', height: '4rem', flexGrow: '1', backgroundColor: 'white' }}> <a rel="noopener noreferrer" href={`https://en.wikipedia.org/wiki/${query}`} target="_blank"> Show More </a> </div>
                </div>
            </div>




            <Footer />
        </>
    );
}

export default SearchResultPage;