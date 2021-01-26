import request from "../../utils/request"

export default {
    // 登录
    goLogin(data) {
        return request({
            url: "/api/mirage/system/userLogin",
            method: "post",
            data
        })
    },
    // 退出登录
    loginOut(data) {
        return request({
            url: "/api/mirage/system/loginOut",
            method: "post",
            data
        })
    },
    // 用户信息
    getInfo(data) {
        return request({
            url: "/api/mirage/system/userInfo",
            method: "post",
            data
        })
    },
}