import React, { useState } from 'react';
import SearchResultPage from './SearchResultPage';

const TopSearchElements = () => {
    const [input, setinput] = useState("");
    const fetch_data = () => {

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
        </>
    );
}

export default TopSearchElements;