export default {
    namespaced: true,
    state: ()=>({
        userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
        openid: uni.getStorageSync('openid') || '',
        swiperList: JSON.parse(uni.getStorageSync('swiperList') || '[]'),
    }),
    
    mutations:{
        updateUserInfo(state, userinfo) {
            state.userinfo = userinfo
            
            this.commit('m_user/saveUserINfoToStorage')
        },
        
        updateSwiperList(state, swiperList) {
            state.swiperList = swiperList
            
            this.commit('m_user/saveSwiperListINfoToStorage')
        },
        
        updateOpenid(state, openid) {
            state.openid = openid
            
            this.commit('m_user/saveOpenidToStorage')
        },
        
        saveUserINfoToStorage(state) {
            uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
        },
        
        saveSwiperListINfoToStorage(state) {
            uni.setStorageSync('swiperList', JSON.stringify(state.swiperList))
        },
        
        saveOpenidToStorage(state) {
            uni.setStorageSync('openid', state.openid)
        }
    },
    getters:{},
}