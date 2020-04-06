import axios from 'axios';

export function request(config) {

    let Url1 = '接口暂不提供';
    let Url2 = '接口暂不提供';
   
    // 1、创建axios实例
    const instance = axios.create({
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
