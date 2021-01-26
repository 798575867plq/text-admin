<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      v-bind:on-progress="uploadVideoProcess"
      v-bind:on-success="handleVideoSuccess"
      v-bind:before-upload="beforeUploadVideo"
      v-bind:show-file-list="false"
    >
      <video
        v-if="showVideoPath !='' && !videoFlag &&type=='video'"
        v-bind:src="showVideoPath"
        class="avatar video-avatar"
        controls="controls"
      ></video>
      <img
        v-if="showVideoPath !='' && !videoFlag&&type=='img'"
        v-bind:src="showVideoPath"
        class="avatar video-avatar"
      />
      <i v-else-if="showVideoPath =='' && !videoFlag" class="el-icon-plus avatar-uploader-icon"></i>
      <el-progress
        v-if="videoFlag == true"
        type="circle"
        v-bind:percentage="videoUploadPercent"
        class="progress-box"
      ></el-progress>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "img",
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      showVideoPath: "",
    };
  },
  methods: {
    //上传前回调
    beforeUploadVideo(file) {
      if (this.type == "video") {
        var fileSize = file.size / 1024 / 1024 < 50;
        if (
          [
            "video/mp4",
            "video/ogg",
            "video/flv",
            "video/avi",
            "video/wmv",
            "video/rmvb",
            "video/mov",
          ].indexOf(file.type) == -1
        ) {
          this.$message({
            message: "请上传正确的视频格式",
            type: "warning",
          });
          return false;
        }
        if (!fileSize) {
          this.$message({
            message: "视频大小不能超过50MB",
            type: "warning",
          });
          return false;
        }
      } else if (this.type == "img") {
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.showVideoPath = file.url;
      //} else {
      //     layer.msg("上传失败，请重新上传");
      //}

      //后台上传地址
      if (res.Code == 0) {
        this.showVideoPath = res.Data;
      } else {
        this.$message({
          message: res.Message,
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 178px;
  height: 178px;
  line-height: 178px;

  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.progress-box {
  width: 178px;
  height: 178px;
  /deep/.el-progress-circle {
    width: 178px !important;
    height: 178px !important;
  }
}
</style>