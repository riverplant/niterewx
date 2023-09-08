
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
import store from '@/store/store.js'
import VueGoogleAutocomplete from "vue-google-autocomplete"


uni.$http = $http

uni.$showMsg = function( title='数据加载失败', duration = 1500 ) {
    uni.showToast({
        title,
        duration,
        icon:'none'
    })
}

//$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(options) {
    uni.showLoading({
        title:'数据加载中...'
    })
}

$http.afterRequest = function() {
    uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif