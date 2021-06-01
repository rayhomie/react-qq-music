import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://music.rayhomie.icu'
      : 'http://localhost:3333/api',
  headers: {
    // 'Content-Type': 'application/json',
    // Accept: '*/*',
    // Connection: 'keep-alive',
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

instance.defaults.timeout = 10000

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
