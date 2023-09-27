export default {
    namespaced: true,
    state: ()=>({
        userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
        pickPointList: uni.getStorageSync('pickPointList'),
        openid: uni.getStorageSync('openid') || '',
        swiperList: JSON.parse(uni.getStorageSync('swiperList') || '[]'),
        token: uni.getStorageSync('token') || '',
        code: uni.getStorageSync('code') || '',
        address: JSON.parse(uni.getStorageSync('address') || '{}'),
        role: uni.getStorageSync('role') || 0,
    }),
    
    mutations:{
        
        updatePickPointList(state, pickPointList) {
           state.pickPointList =  pickPointList
           this.commit('m_user/savePickPointListToStorage')
        },
        updateAddress(state, address) {
            state.address = address
            this.commit('m_user/saveAddressToStorage')
        },
        updateCode(state, code) {
          state.code =  code        
          this.commit('m_user/saveCodeToStorage')
        },
        
        updateToken(state, token) {
          state.token =  token 
          
          this.commit('m_user/saveTokenToStorage')
        },
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
        savePickPointListToStorage(state) {
          uni.setStorageSync('pickPointList', state.pickPointList)    
        },
        saveCodeToStorage(state) {
           uni.setStorageSync('code', state.code)   
        },
        saveTokenToStorage(state) {
           uni.setStorageSync('token', state.token)  
        },
        
        saveUserINfoToStorage(state) {
            uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
        },
        
        saveSwiperListINfoToStorage(state) {
            uni.setStorageSync('swiperList', JSON.stringify(state.swiperList))
        },
        
        saveOpenidToStorage(state) {
            uni.setStorageSync('openid', state.openid)
        },
        saveAddressToStorage(state) {
            uni.setStorageSync('address', JSON.stringify(state.address))
        }
    },
    getters:{
        addstr(state) {
            if(!state.address.provinceName) return ''
            return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
        }
    },
}