import axios from "axios";
import qs from 'qs';


import { Message } from "element-ui";
import store from "../store";
import { getToken } from "@/utils/auth";
// 创建axios实例
const service = axios.create({
    // api的base_url
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 40000 // 请求超时时间

});

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers["token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
            config.headers["content-type"] = "application/json;charset=UTF-8";
        }

        if (config.method == "get") {
            config.url = config.url + "?" + param(config.data)
            // config.url = config.url + "?" + qs.stringify(config.data)
        }
        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非200是抛错
         */
        // debugger
        const res = response.data;
        // console.log(res)
        if (res.code !== 200) {
            // 401:oken 过期了，或非法;
            if (res.code === 401) {
                Message({
                    message: '登录已过期，请重新登陆',
                    type: "error",
                    duration: 1000
                });
                store.dispatch("user/logout").then(() => {
                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                });
            } else {
                Message({
                    message: res.msg == "" ? res.code : res.msg,
                    type: "error",
                    duration: 5 * 1000
                });
            }

            return Promise.reject(res);
        } else {
            return response.data.data;
        }
    },
    error => {
        console.log("err " + error); // for debug
        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    error.message = "未授权，请登录";
                    break;
                case 403:
                    error.message = "拒绝访问";
                    break;
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break;
                case 408:
                    error.message = "请求超时";
                    break;
                case 500:
                    error.message = "服务器内部错误";
                    break;
                case 501:
                    error.message = "服务未实现";
                    break;
                case 502:
                    error.message = "网关错误";
                    break;
                case 503:
                    error.message = "服务不可用";
                    break;
                case 504:
                    error.message = "网关超时";
                    break;
                case 505:
                    error.message = "HTTP版本不受支持";
                    break;
                default:
            }
        }
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}
// querystring格式化 
function param(json) {
    if (!json) return ''
    return cleanArray(Object.keys(json).map(key => {
        // console.log(key, "=================", json[key])
        if (json[key] === undefined) return ''
        return key + '=' + json[key]
    })).join('&')
}

export default service;
