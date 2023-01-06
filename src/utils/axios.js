import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Protected = axios.create()


Protected.interceptors.request.use(
    config => {
        let currentDate = new Date();

        const token = window.localStorage.getItem('bearer_token')
        console.log(token)
        const decodedToken = jwt_decode(token);
        // console.log(decodedToken)
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
             window.location.replace('/login')
        } else {
            config.headers["authorization"] = "Bearer " + token
        }
        // config.headers['Content-Type'] = 'application/json';
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)
export default Protected