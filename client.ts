import { Axios, AxiosError, default as axios } from 'axios';
import delay from 'delay';
import { signSignature } from './src/utils/signSignature';
axios.defaults.withCredentials = true;
const callAPI = async () => {
    const nonce = Math.floor(Math.random()*1000);
    const timestamp = new Date().getTime();
    const signature = signSignature(nonce, timestamp);
    let cookie: string[] = [''];
    // test nonce
    for(const i of [1, 2]){
        try {
            const response = await axios.post(`http://localhost:3000/api`, { nonce, timestamp, signature  }, { withCredentials: true, headers : { 'Cookie': cookie[0] }});
            cookie = response.headers['set-cookie'] as string[]
            console.log(response.data);
        } catch (error) {
            //@ts-ignore
            console.log(error?.response?.data);
        }
    }
    // test timestamp
    await delay(10000)
    try {
        const response = await axios.post(`http://localhost:3000/api`, { nonce, timestamp, signature  }, { withCredentials: true });
        console.log(response.data);
    } catch (error) {
        //@ts-ignore
        console.log(error?.response?.data);
    }
}
callAPI();