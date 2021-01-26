<template>
  <div>
    <div class="audio-box" @click="goPlay()">
      <span>{{num}}"</span>
      <img :src="imgSrc" alt />
      <audio :src="src" id="audio"></audio>
    </div>
    <div
      class="text-box"
      v-if="showText"
    >澳币好虚啊是虚假按顺序就哈桑v嘻爱的采集卡被当场就看不上的接口抽不开时间及时的补充就开始大白菜尽快说的不错数据的补偿款及时的补充可接受的长时间的本次考试哈</div>
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
    src: {
      type: String,
      default: "https://qiniu.withufuture.com/enenen.wav",
    },
    showText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgSrc: require("../assets/left-play.png"),
      num: 0,
      flag: true,
      timer: null,
    };
  },
  created() {
    console.log(this.count);
    this.num = this.count;
  },
  methods: {
    goPlay() {
      //   this.throttle();
      //   this.pausePlay();
      this.stopPlay();
    },

    start() {
      this.stop();
      this.timer = setInterval(() => {
        this.num--;
        if (this.num < 1) {
          this.num = this.count;
          clearInterval(this.timer);
          this.imgSrc = require("../assets/left-play.png");
        }
      }, 1000);
      this.imgSrc = require("../assets/left-play.gif");
      document.getElementById("audio").play();
    },

    stop() {
      this.num = this.count;
      clearInterval(this.timer);
      this.imgSrc = require("../assets/left-play.png");
      document.getElementById("audio").currentTime = 0;
    },

    pause() {
      if (this.num < 1) {
        clearInterval(this.timer);
        this.imgSrc = require("../assets/left-play.png");
      } else {
        clearInterval(this.timer);
        this.imgSrc = require("../assets/left-play.png");
        document.getElementById("audio").pause();
      }
    },

    // 版本1：节流定时器，适用于验证码
    throttle() {
      if (this.flag) {
        this.flag = false;
        this.timer = setInterval(() => {
          this.start();
          this.stop();
        }, 1000);
      }
      console.log(this.flag);
    },

    //版本2： 点击暂停，再点击播放
    pausePlay() {
      if (this.flag) {
        this.start();
        this.flag = false;
      } else {
        this.pause();
        this.flag = true;
      }
      console.log(this.flag);
    },

    // 版本3：点击终止
    stopPlay() {
      if (this.flag) {
        this.start();
        this.flag = false;
      } else {
        this.stop();
        this.flag = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.audio-box {
  background-color: rgb(231, 231, 231);
  border: 1px solid #666;
  padding: 5px 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  img {
    width: 16px;
    height: 16px;
  }
}

.text-box {
  font-size: 12px;
  text-align: left;
}
</style>