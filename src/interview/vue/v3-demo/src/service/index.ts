import axios from 'axios';

// 创建axios实例
const apiClient = axios.create({
  baseURL: '/api', // 使用相对路径，通过vite代理
  timeout: 30000, // 30秒超时
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // 如果需要跨域带cookie
});

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    console.log(`发送请求: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    console.log(`响应状态: ${response.status}`);
    return response;
  },
  error => {
    if (error.response) {
      // 服务器返回错误状态码
      console.error(`请求失败: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      // 请求发送但没有收到响应
      console.error('没有收到响应:', error.request);
    } else {
      // 请求配置出错
      console.error('请求配置错误:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;