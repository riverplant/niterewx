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
       orderListByOpenId: JSON.parse(uni.getStorageSync('orderListByOpenId') || '[]'),
       orderListWithoutBoxId: JSON.parse(uni.getStorageSync('orderListWithoutBoxId') || '[]'),
       catTree:  JSON.parse(uni.getStorageSync('catTree') || '[]'),
	   warehouseRequestList: JSON.parse(uni.getStorageSync('warehouseRequestList') || '[]'),
	   claimList: JSON.parse(uni.getStorageSync('claimList') || '[]'),
    }),
    
    mutations:{
		updateClaimList(state, claimList) {
			state.claimList = claimList
			console.log('claimList:',state.claimList)
			this.commit('m_order/saveClaimListToStorage')
		},
		saveClaimListToStorage(state) {
			console.log('claimList:',state.claimList)
		    uni.setStorageSync('claimList', JSON.stringify(state.claimList))
		},
		
        updateWarehouseRequestByOpenId(state, warehouseRequestList) {
			state.warehouseRequestList = warehouseRequestList
			this.commit('m_order/saveWarehouseRequestByOpenIdToStorage')
		},
		saveWarehouseRequestByOpenIdToStorage(state) {
		    uni.setStorageSync('warehouseRequestList', JSON.stringify(state.warehouseRequestList))
		},
        updateOrderListWithoutBoxId(state, orderListWithoutBoxId) {
            state.orderListWithoutBoxId = orderListWithoutBoxId
            this.commit('m_order/saveOrderListWithoutBoxIdToStorage')
        },
        saveOrderListWithoutBoxIdToStorage(state) {
            uni.setStorageSync('orderListWithoutBoxId', JSON.stringify(state.orderListWithoutBoxId))
        },
        updateOrderListByOpenId(state, orderListByOpenId) {
            state.orderListByOpenId = orderListByOpenId
            this.commit('m_order/saveOrderListByOpenIdToStorage')
        },
        
        saveOrderListByOpenIdToStorage(state) {
            uni.setStorageSync('orderListByOpenId', JSON.stringify(state.orderListByOpenId))
        },
        updateCatTree(state, catTree) {
            state.catTree = catTree
            this.commit('m_order/saveCatTreeToStorage')
        },
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
               state.ordersNonValide.push(orderInfo)
               this.commit('m_order/saveOrdersNonValideToStorage')
        },
        
        updateOrdersNonValide(state, orderInfo) {
           let filteredordersNonValide = state.ordersNonValide.filter( item => item.id !== orderInfo.id);
            filteredordersNonValide.push(orderInfo)
            setOrdersNonValide(filteredordersNonValide)
        },
        
        setOrdersNonValide(state, ordersNonValide) {
           state.ordersNonValide = ordersNonValide
               this.commit('m_order/saveOrdersNonValideToStorage')
        },
        
        saveCatTreeToStorage(state) {
             uni.setStorageSync('catTree', JSON.stringify(state.catTree))
        },
        saveOrdersNonValideToStorage(state) {
            uni.setStorageSync('ordersNonValide', JSON.stringify(state.ordersNonValide))
        },
        
        addToOrdersNonPayer(state, orderInfo) {
            const findResult = state.ordersNonPayer.find( x => x.id === orderInfo.id )
            if(!findResult)
               state.ordersNonPayer.push(orderInfo)
               this.commit('m_order/saveOrdersNonPayerToStorage')
        },
        
        updateOrdersNonPayer(state, orderInfo) {
           let filteredordersNonPayer = state.ordersNonPayer.filter( item => item.id !== orderInfo.id);
            filteredordersNonPayer.push(orderInfo)
            state.ordersNonPayer = filteredordersNonPayer
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
               state.ordersNonLivrer.push(orderInfo)
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
               state.ordersRembourse.push(orderInfo)
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
             let total = state.ordersNonPayer.filter(x=>x.state)
             .reduce((total, item)=> total += item.amount, 0).toFixed(2)
            console.log('total:',total)
           return  total
        },
        
        orderCount(state) {
          let ocount = state.orderListByOpenId.reduce((total, item)=> total += 1, 0)
           console.log('ocount:',ocount)
          return  ocount
        },
		
		requestReviewCount(state) {
			console.log('state.warehouseRequestList.length',state.warehouseRequestList.length)
			if(state.warehouseRequestList.length === 0) return 0
			
			let flag = state.warehouseRequestList.filter(x=>x.isAccepted === 0).reduce((total, item)=> total += 1, 0)
			console.log('flag=',flag)
			return flag
		},
		
		requestCount(state) {
			let flag = state.warehouseRequestList.reduce((total, item)=> total += 1, 0)
			return flag
		}
    },
}