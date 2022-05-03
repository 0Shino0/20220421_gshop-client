/*
专门针对mock接口

axios二次封装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/

import axios from "axios";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'


/*1. 配置通用的基础路径和超时 */
// service是一个能任意ajax请求的函数，当然可以作为对象使用
const service = axios.create({
    // http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
    baseURL:'/mock',  // 基础路径
    timeout:20000,  //超时事件
})

// 添加请求拦截器
service.interceptors.request.use((config)=>{

    /* 2.显示请求进度条 */
    // 显示请求进度条: 在请求拦截器中
    NProgress.start()

    // 必须返回config
    return config   //后面会根据返回的config,使用xhr对象发ajax请求
},() => {})

// 添加响应拦截器
service.interceptors.response.use(
    response => {   //请求成功的返回的回调
        // 隐藏请求进度条: 在响应拦截器的成功的回调中
        NProgress.done()

        /* 成功返回的数据不再是response，而直接是响应体数据response.data */
        return response.data
    },
    error => {    //请求失败的返回的回调
        // 隐藏请求进度条: 在响应拦截器失败的回调中
        NProgress.done()

        /* 4.统一处理请求错误,具体请求也可以选中处理或不处理 */
        alert(error.message || '未知的请求错误')

        // return error //  不能这么写
        // throw error      //抛出错误
        return Promise.reject(error)           //返回一个失败的Promise

    }
)

// service.get('./xxx').then((result) => { 
//     // const result = response.data

//  }).catch(( error ) => { 
//     // 做一些提示之外的特定工作
//   })




// 向外暴露 service
export default service

