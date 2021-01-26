import request from "../../utils/request"

export default {
    // 禁言
    userShutUp(data) {
        return request({
            url: "/api/mirage/ums/banned",
            method: "post",
            data
        })
    },
    // 解除禁言
    userUnShutUp(data) {
        return request({
            url: "/api/mirage/ums/unbanned",
            method: "post",
            data
        })
    },
    // 封号
    userSeal(data) {
        return request({
            url: "/api/mirage/ums/sealAccount",
            method: "post",
            data
        })
    },
    // 解除封号
    userUnSeal(data) {
        return request({
            url: "/api/mirage/ums/unSealAccount",
            method: "post",
            data
        })
    },
    // 用户列表
    userList(data) {
        return request({
            url: "/api/mirage/ums/queryUmsByPage",
            method: "post",
            data
        })
    },
    // 用户详情
    getUserInfoById(data) {
        return request({
            url: "/api/mirage/ums/umsDetailInfo",
            method: "post",
            data
        })
    },
    // 恢复默认头像
    restoreDefaultAvatar(data) {
        return request({
            url: "/mirage/user/restoreDefaultAvatar",
            method: "post",
            data
        })
    },
    // 删除用户视频头像
    delVideoAvatar(data) {
        return request({
            url: "/mirage/user/delVideoAvatar",
            method: "post",
            data
        })
    },
    // 基本资料-编辑
    updateUserDate(data) {
        return request({
            url: "/mirage/user/updateUserDate",
            method: "post",
            data
        })
    },
    // 用户详情-用户动态
    userDynamic(data) {
        return request({
            url: "/mirage/user/dynamic",
            method: "post",
            data
        })
    },
    // 操作日志
    personalData(data) {
        return request({
            url: "/api/mirage/ums/queryLogByPage",
            method: "post",
            data
        })
    },
    // 个人相册
    userAlbum(data) {
        return request({
            url: "/mirage/user/album",
            method: "post",
            data
        })
    },
    // 语音签名
    voiceSignature(data) {
        return request({
            url: "/mirage/user/voiceSignature",
            method: "post",
            data
        })
    },
    // 招呼语
    callLanguage(data) {
        return request({
            url: "/mirage/user/callLanguage",
            method: "post",
            data
        })
    },
    // 充值记录
    reChargeRecord(data) {
        return request({
            url: "/mirage/user/reChargeRecord",
            method: "post",
            data
        })
    },
    //登录登出记录
    loginRecord(data) {
        return request({
            url: "/mirage/user/loginRecord",
            method: "post",
            data
        })
    },
    //账单明细
    billRecord(data) {
        return request({
            url: "/mirage/user/billRecord",
            method: "post",
            data
        })
    },
    //提现记录
    withdrawalRecord(data) {
        return request({
            url: "/mirage/user/withdrawalRecord",
            method: "post",
            data
        })
    },

    //获取平台币和收入币
    findIcons(data) {
        return request({
            url: "/mirage/income/findIcons",
            method: "post",
            data
        })
    },

    //增加平台币、收入币、扣除平台币、收入币
    updateIcons(data) {
        return request({
            url: "/mirage/income/updateIcons",
            method: "post",
            data
        })
    },
}