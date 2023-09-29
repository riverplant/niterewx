
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
import store from '@/store/store.js'
import vueGoogleAutocomplete from 'vue-google-autocomplete'


uni.$http = $http

uni.$showMsg = function( title='数据加载失败', duration = 1500 ) {
    uni.showToast({
        title,
        duration,
        icon:'none'
    })
}

//$http.baseUrl = 'https://13bc-184-162-136-202.ngrok.io'

$http.beforeRequest = function(options) {
    uni.showLoading({
        title:'数据加载中...'
    })
    if(options.url.indexOf('/wx/') !== -1) {
        options.header = {
            Authorization:store.state.m_user.token
        }
    }
}

$http.afterRequest = function() {
    uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store,
    vueGoogleAutocomplete
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