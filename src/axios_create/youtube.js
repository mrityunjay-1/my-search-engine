import axios from 'axios';

const api_key = process.env.API_KEY2;

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: api_key
    }
})

export default youtube;
