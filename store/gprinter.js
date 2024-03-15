export default {
    namespaced: true,
    state: ()=>({
	   deviceId: uni.getStorageSync('deviceId') || '',
	   serviceId: uni.getStorageSync('serviceId') || '',
	   characteristicId: uni.getStorageSync('characteristicId') || '',
    }),
    
    mutations:{
		updateDeviceId(state, deviceId) {
			console.log('deviceId:',deviceId)
			state.deviceId = deviceId
			this.commit('m_gprinter/saveDeviceIdToStorage')
		},
		saveDeviceIdToStorage(state) {
			 uni.setStorageSync('deviceId', deviceId)
		}
		
    }
}