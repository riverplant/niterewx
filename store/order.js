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
       ordersRembourse: JSON.parse(uni.getStorageSync('ordersRembourse') || '[]')

    }),
    
    mutations:{
        // 更新所有的勾选状态
        updateAllOrdersState(state, newState) {
           state.ordersNonPayer.forEach(x => x.state = newState) 
           this.commit('m_order/saveOrdersNonPayerToStorage')
        },
       removeItemById(state, order_Id) {
        state.ordersNonPayer = state.ordersNonPayer.filter(x => x.id !== order_Id) 
        this.commit('m_order/saveOrdersNonPayerToStorage')
       },
       updateOrderState(state, orders) {
           const findResult = state.ordersNonPayer.find(x => x.id === orders.id) 
           if(findResult) {
               findResult.state = orders.state
               this.commit('m_order/saveOrdersNonPayerToStorage')
           }
       },
        addToOrdersNonValide(state, orderInfo) {
            const findResult = state.ordersNonValide.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.ordersNonValide.push(orders)
               this.commit('m_order/saveOrdersNonValideToStorage')
        },
        
        setOrdersNonValide(state, ordersNonValide) {
           state.ordersNonValide = ordersNonValide
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
           state.ordersNonPayer = ordersNonPayer
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
           state.ordersNonLivrer = ordersNonLivrer
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
           state.ordersRembourse = ordersRembourse
               this.commit('m_order/saveOrdersRembouseToStorage')
        },
        
        saveOrdersRembouseToStorage(state) {
            uni.setStorageSync('ordersRembourse', JSON.stringify(state.ordersRembourse))
        },
        
 
    },
    getters:{
        //被选中的数量
        checkedCount(state) {
            let checkedCount = state.ordersNonPayer.filter(x=>x.state).reduce((total,item)=> total += 1, 0)
            console.log('checkedCount:',checkedCount)
            return checkedCount
        },
        //总数量
        count(state) {
             let count = state.ordersNonPayer.reduce((total, item)=> total += 1, 0)
            console.log('count:',count)
           return  count
        },
        
        ordersNonValideTotal(state) {
             let ordersNonValideTotal = state.ordersNonValide.reduce((total, item)=> total += 1, 0)
            console.log('ordersNonValideTotal:',ordersNonValideTotal)
           return  ordersNonValideTotal
        },
        
        //总价格
        total(state) {
             let total = state.ordersNonPayer.filter(x=>x.state).reduce((total, item)=> total += item.price, 0)
            console.log('total:',total)
           return  total
        },
    },
}