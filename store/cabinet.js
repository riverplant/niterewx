export default {
    namespaced: true,
    state: ()=>({
	   boxList:JSON.parse(uni.getStorageSync('boxList') || '[]'),
    }),
    
    mutations:{
		updateBoxList(state, boxList) {
			console.log('update;',boxList)
			state.boxList = boxList
			this.commit('m_cabinet/saveBoxListToStorage')
		},
		saveBoxListToStorage(state) {
			 uni.setStorageSync('boxList', JSON.stringify(state.boxList))
		},
		// 更新所有的勾选状态
		 updateAllBoxsState(state, newState) {
		    state.boxList.forEach(x => x.state = newState) 
		    this.commit('m_cabinet/saveBoxListToStorage')
		 },
		
		updateBoxState(state, box) {
		    const findResult = state.boxList.find(x => x.id === box.id) 
		    if(findResult) {
		        findResult.state = box.state
		        this.commit('m_cabinet/saveBoxListToStorage')
		    }
		},
		
    },
    getters:{
        //被选中的数量
        checkedCount(state) {
            let checkedCount = state.boxList.filter(x=>x.state).reduce((total,item)=> total += 1, 0)
            return checkedCount
        },
        
        //总数量
        count(state) {
             let count = state.boxList.reduce((total, item)=> total += 1, 0)
            console.log('count:',count)
           return  count
        },
		
		//被选中的数量
		checkedBoxIDS(state) {
		    let boxIDS = state.boxList.filter(x=>x.state).map(box=>box.id)
		    return boxIDS
		},
  
    }
}