import request from "../../utils/request"

export default {
    // 优惠劵-列表-条件查询
    couponList(data) {
        return request({
            url: "/mirage/operate/couponList",
            method: "post",
            data
        })
    },
    // 已发布的优惠劵列表
    releaseList(data) {
        return request({
            url: "/mirage/coupon/releaseList",
            method: "post",
            data
        })
    },
    // 添加优惠劵
    addCoupon(data) {
        return request({
            url: "/mirage/coupon/addCoupon",
            method: "post",
            data
        })
    },
}