import axios from 'axios';

const api_key = 'AIzaSyA1ehn-vr2bu894fUOBfE1YMF7gaDMl4uE';

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: api_key
    }
})

export default youtube;