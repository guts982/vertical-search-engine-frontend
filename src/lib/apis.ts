import axios from 'axios';

const API_URL = "http://127.0.0.1:8000"; 

const axiosBase = axios.create({
    baseURL: API_URL+'/api',
    timeout: 5000,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
    }
});


export const startScrappingPublications = async () => {
    const {data} = await axiosBase.post('/scrapper/scrape-all');
    console.log("startscrape res", data)
    return data.data;
};



