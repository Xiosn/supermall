import axios from 'axios';

export function request(config) {

    let Url1 = 'http://123.207.32.32:8000/api/wh';
    let Url2 = 'http://106.54.54.237:8000/api/wh';
   
    // 1、创建axios实例
    const instance = axios.create({
        // baseURL: 'http://106.54.54.237:8000/api/hy',
        // baseURL: "http://123.207.32.32:8000/api/hy",
        baseURL: Url1 ? Url1 : Url2,
        
        timeout: 3000
    })

    // 2.axios拦截器
    // 2.1请求拦截作用(成功、失败)
    instance.interceptors.request.use(config => {
        return config;
    }, err => {
        console.log(err)
    }
    )

    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err)
    }
    )

    return instance(config)
}
