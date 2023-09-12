export default {
    namespaced: true,
    state: ()=>({
        /**
         * id, code, trackingNumber, pLong, pWidth,  pHeight,pWeight, price, payMethod, amount,payStatus   
         * postPrice, discount, catName, updateTime, createTime, rderStatus, isDelete,  msg, extand
         */
       ordersNonValide:[],
       ordersNonPayer:[],
       ordersNonLivrer:[],
       ordersRembourse:[]
    }),
    
    mutations:{
        addToOrdersNonValide(state, orderInfo) {
            const findResult = state.ordersNonValide.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.orders.push(orders)
        },
        
        addToOrdersNonPayer(state, orderInfo) {
            const findResult = state.ordersNonPayer.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.orders.push(orders)
        },
        
        addToOrdersNonLivrer(state, orderInfo) {
            const findResult = state.ordersNonLivrer.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.orders.push(orders)
        },
        addToOrdersRembouse(state, orderInfo) {
            const findResult = state.ordersRembourse.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.orders.push(orders)
        }
        
 
    },
    getters:{},
}