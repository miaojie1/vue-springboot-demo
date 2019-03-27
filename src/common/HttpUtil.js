var axios = require('axios')
// var Qs = require('qs')
// 本地
var root = 'http://127.0.0.1:8083/demo'
// axios.defaults.paramsSerializer = (params) => {
//   return Qs.stringify(params, {arrayFormat: 'brackets'})
// }
export default{
  get: function (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        params: params,
        baseURL: root,
        withCredentials: true
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  put: function (url, params) {
    return new Promise((resolve, reject) => {
      // 设置超时时间
      // axios.defaults.retry = 4
      // axios.defaults.retryDelay = 1000
      // axios.defaults.timeout = 20000
      // 添加请求拦截器
      axios({
        method: 'PUT',
        url: url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: params,
        baseURL: root,
        withCredentials: true
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  delete: function (url, params) {
    return new Promise((resolve, reject) => {
      // 设置超时时间
      // axios.defaults.retry = 4
      // axios.defaults.retryDelay = 1000
      // axios.defaults.timeout = 20000
      // 添加请求拦截器
      axios({
        method: 'DELETE',
        url: url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        params: params,
        baseURL: root,
        withCredentials: true
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  post: function (url, params) {
    return new Promise((resolve, reject) => {
      // 设置超时时间
      // axios.defaults.retry = 4
      // axios.defaults.retryDelay = 1000
      // axios.defaults.timeout = 20000
      // 添加请求拦截器
      axios({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        data: params,
        baseURL: root,
        withCredentials: true
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
