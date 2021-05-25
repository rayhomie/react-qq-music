import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.137.150:3000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Connection: 'keep-alive',
  },
  transformRequest: [
    data => {
      if (!(data instanceof FormData)) {
        data = JSON.stringify(data)
      }
      return data
    },
  ],
})

instance.defaults.timeout = 2500

// http request 拦截器
instance.interceptors.request.use(
  async config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  }
)

export default instance
