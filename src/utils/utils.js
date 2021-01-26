import { MessageBox, Message } from 'element-ui';

export default {
    comfirmFun(question, text, api, param, fun) {
        MessageBox.confirm(question, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                api(param).then((res) => {
                    Message({
                        message: text + "成功",
                        type: "success",
                    });
                    if (fun) {
                        fun();
                    }
                });
            })
            .catch(() => {
                Message({
                    type: "info",
                    message: "已取消" + text,
                });
            });
    },
    add0(m) { return m < 10 ? '0' + m : m },
    //时间戳转化成时间格式
    timeFormat(timestamp) {
        timestamp = Number(timestamp)
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        return year + '-' + this.add0(month) + '-' + this.add0(date) + ' ' + this.add0(hours) + ':' + this.add0(minutes) + ':' + this.add0(seconds);
    }
}

