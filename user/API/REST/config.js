import axios from 'axios'

import { REST_API_URL } from '@env'

const axiosBaseURL = axios.create({
    baseURL: REST_API_URL
})

export default axiosBaseURL