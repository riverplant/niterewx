export default {
    namespaced: true,
    state: ()=>({
        userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		accessToken: uni.getStorageSync('accessToken') || '',
        pickPointList: JSON.parse(uni.getStorageSync('pickPointList') || '[]'),
        openid: uni.getStorageSync('openid') || '',
        swiperList: JSON.parse(uni.getStorageSync('swiperList') || '[]'),
        token: uni.getStorageSync('token') || '',
        code: uni.getStorageSync('code') || '',
        address: JSON.parse(uni.getStorageSync('address') || '{}'),
        role: uni.getStorageSync('role') || 0, 
        pickPoint: uni.getStorageSync('pickPoint') || '', 
		tabBarList: JSON.parse(uni.getStorageSync('tabBarList') || '[]'),
		departureDateList: JSON.parse(uni.getStorageSync('departureDateList') || '[]'),
    }),
    
    mutations:{
		updateAccessToken(state, accessToken) 
		{
			state.accessToken =  accessToken
			this.commit('m_user/saveAccessTokenToStorage')
		},
		
		saveAccessTokenToStorage(state) {
			uni.setStorageSync('accessToken', state.accessToken)
		},
		
		updateDepartureDateList(state, departureDateList) {
		   state.departureDateList =  departureDateList
		   this.commit('m_user/saveDepartureDateListToStorage')
		},
		
		saveDepartureDateListToStorage(state) {
		  uni.setStorageSync('departureDateList', JSON.stringify(state.departureDateList))    
		},
		
		updateTabBarList(state, tabBarList) {
		   state.tabBarList =  tabBarList
		   this.commit('m_user/saveTabBarListToStorage')
		},
        
		saveTabBarListToStorage(state) {
			uni.setStorageSync('tabBarList', JSON.stringify(state.tabBarList))    
		},
		
        updatePickPoint(state, pickPoint) {
           state.pickPoint =  pickPoint
           this.commit('m_user/savepickPointToStorage')
        },
        
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
        
        savepickPointToStorage(state) {
            uni.setStorageSync('pickPoint', state.pickPoint) 
        },
        savePickPointListToStorage(state) {
          uni.setStorageSync('pickPointList', JSON.stringify(state.pickPointList))    
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
            if(!state.address.formatted_address) return ''
            return state.address.formatted_address
        },
		
		ppList(state) {
		   let ppList = []
		   for (let i = 0; i < state.pickPointList.length; i++) {
		   		if(state.pickPointList[i].children === null) 
		   		{
		   		 ppList.push(state.pickPointList[i]) 	
		   		} else {
		   			for (let j = 0; j < state.pickPointList[i].children.length; j++) {
		   			  ppList.push(state.pickPointList[i].children[j]) 	
		   			}
		   				
		   		} 
		   	}
			
			return ppList
		}
    },
}