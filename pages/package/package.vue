<template>
    <view>
		<view class="">
			 <create-order></create-order>
		</view>

	  
    </view>
	
</template>

<script>
    import {
        mapState, mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                
            };
        },
        onShow() {
			console.log('onShow.....')
            this.initOrderListWithoutBoxId()
            this.initCatTree()
        },
        methods: {
         ...mapMutations('m_order',['updateCatTree','updateOrderListWithoutBoxId']),
         
         async initOrderListWithoutBoxId() {
           const {data: res} = await uni.$http.get('/wx/orders/getAllorderList')
           if (res.status != 200) return uni.$showMsg('查詢未裝箱訂單列表失败!')
            console.log('res:', res.data)
            this.updateOrderListWithoutBoxId(res.data)  
         },
         
         async initCatTree() {
             const {data: res} = await uni.$http.get('/wx/orders/catlist')
             if (res.status != 200) return uni.$showMsg('查詢商品類別列表失败!')
              console.log('res:', res.data)
              this.updateCatTree(res.data)
         }   
        }
       
    }
</script>

<style lang="scss">

</style>
