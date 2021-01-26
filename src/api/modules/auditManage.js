import request from "../../utils/request"

export default {
    // 批量下发
    distribution(data) {
        return request({
            url: "/mirage/baseAudit/batchCollection",
            method: "post",
            data
        })
    },
    // 演员认证-详情
    auditDetails(data) {
        return request({
            url: "/mirage/audit/actorInfo",
            method: "post",
            data
        })
    },
    // 用户头像审核-获取头像列表
    getAvatarList(data) {
        return request({
            url: "/mirage/userAvatar/getAvatarList",
            method: "post",
            data
        })
    },
    // 用户头像审核-通过
    userAvatarPass(data) {
        return request({
            url: "/mirage/userAvatar/pass",
            method: "post",
            data
        })
    },
    // 用户头像审核-不通过
    userAvatarNopass(data) {
        return request({
            url: "/mirage/userAvatar/noPass",
            method: "post",
            data
        })
    },
    // 动态审核列表
    dynamicReviewList(data) {
        return request({
            url: "/mirage/dynamicReview/dynamicList",
            method: "post",
            data
        })
    },
    // 动态审核-通过
    dynamicReviewPass(data) {
        return request({
            url: "/mirage/dynamicReview/pass",
            method: "post",
            data
        })
    },
    // 动态审核-不通过
    dynamicReviewNopass(data) {
        return request({
            url: "/mirage/dynamicReview/noPass",
            method: "post",
            data
        })
    },
    // 演员头像审核-审核列表
    getActorAvatarList(data) {
        return request({
            url: "/mirage/actorAvatar/getAvatarList",
            method: "post",
            data
        })
    },
    // 演员头像审核-通过
    actorAvatarPass(data) {
        return request({
            url: "/mirage/actorAvatar/pass",
            method: "post",
            data
        })
    },
    //演员头像审核-不通过
    actorAvatarNopass(data) {
        return request({
            url: "/mirage/actorAvatar/noPass",
            method: "post",
            data
        })
    },
    // 用户签名审核-审核列表
    userSignatureList(data) {
        return request({
            url: "/mirage/userSignatureReview/userSignatureList",
            method: "post",
            data
        })
    },
    // 用户签名审核-通过
    userSignaturePass(data) {
        return request({
            url: "/mirage/userSignatureReview/pass",
            method: "post",
            data
        });
    },
    // 用户签名审核-不通过
    userSignatureNoPass(data) {
        return request({
            url: "/mirage/userSignatureReview/noPass",
            method: "post",
            data
        });
    },
    // 用户语音签名
    userVoiceList(data) {
        return request({
            url: "/mirage/userVoiceReview/userVoiceList",
            method: "post",
            data
        });
    },
    // 用户语音签名-通过
    userVoiceReviewPass(data) {
        return request({
            url: "/mirage/userVoiceReview/pass",
            method: "post",
            data
        });
    },
    // 用户语音签名-不通过
    userVoiceReviewNoPass(data) {
        return request({
            url: "/mirage/userVoiceReview/noPass",
            method: "post",
            data
        });
    },
    // 动态评论审核-审核列表
    commentReviewList(data) {
        return request({
            url: "/mirage/commentReview/commentList",
            method: "post",
            data
        });
    },
    // 动态评论-通过
    commentReviewPass(data) {
        return request({
            url: "/mirage/commentReview/pass",
            method: "post",
            data
        });
    },
    // 动态评论-不通过
    commentReviewNoPass(data) {
        return request({
            url: "/mirage/commentReview/noPass",
            method: "post",
            data
        });
    },
    // 评价审核-列表数据
    evaluationReviewList(data) {
        return request({
            url: "/mirage/evaluationReview/evaluationList",
            method: "post",
            data
        });
    },
    // 演员提现-通过
    actorApproved(data) {
        return request({
            url: "/mirage/actor/approved",
            method: "post",
            data
        });
    },
    // 订单评价-通过
    evaluationReviewPass(data) {
        return request({
            url: "/mirage/evaluationReview/pass",
            method: "post",
            data
        });
    },
    // 演员提现-不通过
    actorUnApproved(data) {
        return request({
            url: "/mirage/actor/unApproved",
            method: "post",
            data
        });
    },
    // 订单评价-不通过
    evaluationReviewNoPass(data) {
        return request({
            url: "/mirage/evaluationReview/noPass",
            method: "post",
            data
        });
    },
    // 演员认证-数据列表
    actorCerList(data) {
        return request({
            url: "/mirage/actorCertification/actorCerList",
            method: "post",
            data
        });
    },
    // 演员提现-通过
    appRoved(data) {
        return request({
            url: "/mirage/actor/approved",
            method: "post",
            data
        });
    },
    // 演员提现-不通过
    unApproved(data) {
        return request({
            url: "/mirage/actor/unApproved",
            method: "post",
            data
        });
    },
}