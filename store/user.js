export default {
    namespaced: true,
    state: ()=>({
        userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
        openid: uni.getStorageSync('openid') || ''
    }),
    
    mutations:{
        updateUserInfo(state, userinfo) {
            state.userinfo = userinfo
            
            this.commit('m_user/saveUserINfoToStorage')
        },
        
        updateOpenid(state, openid) {
            state.openid = openid
            
            this.commit('m_user/saveOpenidToStorage')
        },
        
        saveUserINfoToStorage(state) {
            uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
        },
        
        saveOpenidToStorage(state) {
            uni.setStorageSync('openid', state.openid)
        }
    },
    getters:{},
}