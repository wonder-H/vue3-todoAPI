import axios from 'axios'

export default axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'Content-type': 'application/json',
    'Apikey': 'FcKdtJs202204',
    'Username': 'KDT2_WonYunHee',
  },
})
