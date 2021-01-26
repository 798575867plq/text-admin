import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";



import "@/permission";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)


import * as util from "./utils/utils"
Vue.prototype.$util = util

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// Vue.use(Antd);

import myImg from '@/components/myImg'
Vue.component("myImg", myImg);

import myMask from '@/components/myMask'
Vue.component("myMask", myMask);

import myVideo from '@/components/myVideo'
Vue.component("myVideo", myVideo);

import myAudio from '@/components/myAudio'
Vue.component("myAudio", myAudio);

import myForm from '@/components/myForm'
Vue.component("myForm", myForm);

//网络请求
import { apis } from './api'
Vue.prototype.$api = apis

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
