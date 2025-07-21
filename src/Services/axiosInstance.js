import axios from 'axios';
import {ENV} from '@/Utils'
const axiosInstance = axios.create({
        baseURL: ENV.API_HOST_PRODUCCION,
        headers: {
          'Content-Type': 'application/json'
        }
      });

// interceptors


      export {
        axiosInstance
      }