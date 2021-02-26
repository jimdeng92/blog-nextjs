/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios"

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg) => {
  console.log(msg)
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 404请求不存在
    case 404:
      tip("请求的资源不存在");
      break;
    default:
      tip(other);
  }
};

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 10 });
// 设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/json";
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    // token && (config.headers.Authorization = token);
    return config;
  },
  (error) => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (res) => {
    if (res.status !== 200) {
      return Promise.reject(res.message)
    }
    if (!res.data || res.data.code !== 200) {
      return Promise.reject(res.data.message)
    }
    return Promise.resolve(res.data)
  },
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data);
      return Promise.reject(response);
    }
  }
);

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params){    
  return new Promise((resolve, reject) =>{        
    instance.get(url, {params})        
      .then(res => {
        if (res.code !== 200) {
          reject(res)
          return
        }
        resolve(res) 
      })        
      .catch(err => {            
        reject(err)        
      })    
  });
}
/** 
* post方法，对应post请求 
* @param {String} url [请求的url地址] 
* @param {Object} params [请求时携带的参数] 
*/
export function post(url, params) {    
  return new Promise((resolve, reject) => {         
    instance.post(url, params)        
      .then(res => { 
        if (res.code !== 200) {
          reject(res)
          return
        }
        resolve(res)
      })        
      .catch(err => {            
        reject(err)        
      })    
  })
}

// export default instance
