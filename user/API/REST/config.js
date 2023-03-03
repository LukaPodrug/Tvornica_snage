import axios from 'axios'
import Constants from 'expo-constants'

const axiosBaseURL = axios.create({
    baseURL: Constants.expoConfig.extra.restApiUrl
})

export default axiosBaseURL