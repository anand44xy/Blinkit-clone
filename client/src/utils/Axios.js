import axios from 'axios'
import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true  // Send cookies along with the request
})

export default Axios