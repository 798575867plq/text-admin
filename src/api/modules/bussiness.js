import request from "../../utils/request"

export default {
    //业务监控-动态列表
    busDynamicList(data) {
        return request({
            url: "/mirage/business/busDynamicList",
            method: "post",
            data
        })
    },
    //动态列表-下架
    delDynamic(data) {
        return request({
            url: "/mirage/business/delDynamic",
            method: "post",
            data
        })
    },
    //业务监控-评论、评价列表
    businessCommentList(data) {
        return request({
            url: "/mirage/business/businessCommentList",
            method: "post",
            data
        })
    },
    //业务监控-评论、评价-下架
    delComment(data) {
        return request({
            url: "/mirage/business/delComment",
            method: "post",
            data
        })
    },
    //聊天违规的列表
    getChatList(data) {
        return request({
            url: "/mirage/business/getChatList",
            method: "post",
            data
        })
    },
    //聊天记录查询
    getChatInfo(data) {
        return request({
            url: "/mirage/business/getChatInfo",
            method: "post",
            data
        })
    },
}