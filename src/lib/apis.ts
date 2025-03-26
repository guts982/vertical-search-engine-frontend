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


export const search = async (queryParameters: any) => {
    const start = performance.now(); 
    const {data} = await axiosBase.get('/search', {
        params: queryParameters
    });
    const end = performance.now(); 
    return {...data.data, responseTime: formatResponseTime(end - start)};
};


export const getAuthorPublications = async (authorIds: string[]) => {
    const start = performance.now(); 
    const {data} = await axiosBase.post('/author-publications', authorIds);
    const end = performance.now(); 
    return { data: data.data, responseTime: formatResponseTime(end - start)};
};



export const getScrappingLogs = async () => {
    const {data} = await axiosBase.get('/scrapper/logs');
    return data.data;
}

const formatResponseTime = (time:any) => {
    // if (time < 1000) return `${Math.round(time)} ms`;
    return `${(time / 1000).toFixed(2)} s`;
  };
  
