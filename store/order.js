export default {
    namespaced: true,
    state: ()=>({
        /**
         * id, code, trackingNumber, pLong, pWidth,  pHeight,pWeight, price, payMethod, amount,payStatus   
         * postPrice, discount, catName, updateTime, createTime, rderStatus, isDelete,  msg, extand
         */
       ordersNonValide: JSON.parse(uni.getStorageSync('ordersNonValide') || '[]'),
       ordersNonPayer: JSON.parse(uni.getStorageSync('ordersNonPayer') || '[]'),
       ordersNonLivrer: JSON.parse(uni.getStorageSync('ordersNonLivrer') || '[]'),
       ordersRembourse: JSON.parse(uni.getStorageSync('ordersRembourse') || '[]'),
    }),
    
    mutations:{
       
        addToOrdersNonValide(state, orderInfo) {
            const findResult = state.ordersNonValide.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.ordersNonValide.push(orders)
               this.commit('m_order/saveOrdersNonValideToStorage')
        },
        
        setOrdersNonValide(state, ordersNonValide) {
           this.ordersNonValide = ordersNonValide
               this.commit('m_order/saveOrdersNonValideToStorage')
        },
        
        saveOrdersNonValideToStorage(state) {
            uni.setStorageSync('ordersNonValide', JSON.stringify(state.ordersNonValide))
        },
        
        addToOrdersNonPayer(state, orderInfo) {
            const findResult = state.ordersNonPayer.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.ordersNonPayer.push(orders)
               this.commit('m_order/saveOrdersNonPayerToStorage')
        },
        
        setOrdersNonPayer(state, ordersNonPayer) {
           this.ordersNonPayer = ordersNonPayer
               this.commit('m_order/saveOrdersNonPayerToStorage')
        },
        
        saveOrdersNonPayerToStorage(state) {
            uni.setStorageSync('ordersNonPayer', JSON.stringify(state.ordersNonPayer))
        },
        
        addToOrdersNonLivrer(state, orderInfo) {
            const findResult = state.ordersNonLivrer.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.ordersNonLivrer.push(orders)
               this.commit('m_order/saveOrdersNonLivrerToStorage')
        },
        
        setOrdersNonLivrer(state, ordersNonLivrer) {
           this.ordersNonLivrer = ordersNonLivrer
               this.commit('m_order/saveOrdersNonLivrerToStorage')
        },
        
        saveOrdersNonLivrerToStorage(state) {
            uni.setStorageSync('ordersNonLivrer', JSON.stringify(state.ordersNonLivrer))
        },
        addToOrdersRembouse(state, orderInfo) {
            const findResult = state.ordersRembourse.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.ordersRembourse.push(orders)
               this.commit('m_order/saveOrdersRembouseToStorage')
        },
        
        setOrdersRembouse(state, ordersRembourse) {
           this.ordersRembourse = ordersRembourse
               this.commit('m_order/saveOrdersRembouseToStorage')
        },
        
        saveOrdersRembouseToStorage(state) {
            uni.setStorageSync('ordersRembourse', JSON.stringify(state.ordersRembourse))
        },
        
 
    },
    getters:{},
}