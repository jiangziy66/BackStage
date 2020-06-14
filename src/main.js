import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入初始化文件
import './assets/css/reset.css'

// 引入字体图标库
import './assets/fonts/iconfont.css'

// 引入插件 elementui
import './plugins/element.js'

//引入
import './assets/css/global.css'

// 引入axios并配置
import axios from 'axios'
import { Message } from 'element-ui'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 在请求发送之前 配置headers头信息 config是一个配置对象 你想配置什么就在config上配置即可
  const tokenStr = localStorage.getItem('token')
  if (tokenStr) config.headers.Authorization = tokenStr
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  if (response.status !== 200) {
    // 女神电话没接通
    Message.error('网络异常')
  } else {
    // 女神电话接通 但是拒绝了你
    if (response.data.meta.status !== 200) {
      Message.error(response.data.meta.msg || '异常问题')
    }
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 配置axios的基准url
axios.defaults.baseURL = 'http://www.klxin.cn:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
