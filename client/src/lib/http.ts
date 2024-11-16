import axios from 'axios'

const http = axios.create({
  baseURL: '/', // 你的API地址
  timeout: 10000, // 请求超时时间
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么：例如添加token
    // config.headers['Authorization'] = '你的token';
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (res: any) => {
    // 对响应数据做点什么
    // 根据你的业务处理回调
    if (res.status >= 200 && res.status < 300) {
      return res.data
    }
    // 处理错误
    if (res.status === 401 || res.status === 403) {
      // 跳转到登录页
      window.location.href = '/login'
      return Promise.reject(new Error('请登录'))
    } else {
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error) => {
    // 对响应错误做点什么
    console.log('error :>> ', error)
    if (error.status === 401 || error.status === 403) {
      // 跳转到登录页
      window.location.href = '/login'
      return Promise.reject(new Error('请登录'))
    }
    return Promise.reject(error)
  }
)

export default http
