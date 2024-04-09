<template>
    <view class="my-container">
	  <create-order  :items="items" :itemsBak="items" v-if="userinfo.userRoles == 2 "></create-order>
      <my-information v-else></my-information>
	   <tabBar :current="0"></tabBar>
    </view>
	 
</template>


<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
		    return {
		        items: [],
				warehouseRequestList: []
		    }
		},
		onShow() {
		    if ( !this.token ) {
				this.updateTabBarList( getApp().globalData.clientTabBarList )
		    }else {
				if(this.userinfo.userRoles == 2) 
				{
					this.initAllOrderList()
					this.initCatTree()
				}
				
			}
			
		},
		computed: {
		    ...mapState('m_user', ['userinfo','token'])
		},
		
		methods: {
			...mapMutations('m_user', [ 'updateTabBarList']),
			...mapMutations('m_order', ['updateOrderList','updateCatTree'
			]),
			async initAllOrderList() {
			  const {data: res} = await uni.$http.get('/wx/orders/getAllorderList')
			  if (res.status != 200) return uni.$showMsg('查詢未裝箱訂單列表失败!')
			  this.items = res.data
			   this.updateOrderList(res.data)  
			},
			
			async initCatTree() {
			    const {data: res} = await uni.$http.get('/wx/orders/catlist')
			    if (res.status != 200) return uni.$showMsg('查詢商品類別列表失败!')
			     this.updateCatTree(res.data)
			}
			}
	}
</script>

<style>
    page,
    .my-container {
        height: 100%;
    }
</style>
