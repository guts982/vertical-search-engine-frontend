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


export const startScrappingPublications = async (sessionId:string) => {
    const {data} = await axiosBase.post('/scrapper/scrape-all',{session_id:sessionId});
    console.log("startscrape res", data)
    return data.data;
};


export const getScrappingLogs = async () => {
    const {data} = await axiosBase.get('/scrapper/logs');
    console.log("startscrape res", data)
    return data.data;
}


