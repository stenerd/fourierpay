import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Protected = axios.create()

// export const BASE_URL = `https://fourierpay.hostless.app`
// export const BASE_URL = `http://localhost:9000`

// export const BASE_URL = `https://fourierpayapi.herokuapp.com`

// export const BASE_URL = `https://fourierpay.hostless.app`
// export const BASE_URL = `http://localhost:9000`
export const BASE_URL =`https://fourierpayapi-qlbq.onrender.com`

// export const BASE_URL = `https://fourierpayapi.herokuapp.com`


Protected.interceptors.request.use(
    config => {
        let currentDate = new Date();

        const token = window.localStorage.getItem('bearer_token')
        // console.log(token)
        // const decodedToken = jwt_decode(token);
        // console.log('decodedToken >> ', decodedToken)
        // if (decodedToken.exp * 1000 < currentDate.getTime()) {
        //      window.location.replace('/login')
        // } else {
        //     config.headers["authorization"] = "Bearer " + token
        // }
        // config.headers['Content-Type'] = 'application/json';
        config.headers["authorization"] = "Bearer " + token
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)
export default Protected;