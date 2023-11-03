<template>
    <view class="my-container">
        <my-login v-if="!token"></my-login>
        <my-userinfo v-else-if="userinfo.userRoles == 3"></my-userinfo>
		<create-order v-else></create-order>
      <tabBar :current="0"></tabBar>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                orderList: [],
                ordersNonValide: [],
                ordersNonPayer: [],
                ordersNonLivrer: [],
                ordersRembourse: [],
				warehouseRequestList: []
            }
        },
        
        onShow() {
            if (this.token) {
               // this.initSwiperDate()
				this.getWarehouseRequest()
				this.getuserInfo()
				if(this.userinfo.userRoles == 2) 
				{
					this.initAllOrderList()
					this.initCatTree()
				}
				
            }
        },
        computed: {
            ...mapState('m_user', ['token', 'openid','userinfo'])
        },
        methods: {
            ...mapMutations('m_user', ['updateSwiperList','updateUserInfo']),
            ...mapMutations('m_order', ['setOrdersNonValide', 'setOrdersNonPayer', 'setOrdersNonLivrer',
                'setOrdersRembouse', 'updateOrderListByOpenId','updateWarehouseRequestByOpenId', 'updateClaimList','updateOrderList','updateCatTree'
            ]),

           /** async initSwiperDate() {
                const {
                    data: result
                } = await uni.$http.get('https://www.uinav.com/api/public/v1/home/swiperdata')
                if (result.meta.status !== 200) return uni.$showMsg()
                console.log('swiperdata:', result.message)
                this.updateSwiperList(result.message)
                this.initOrders()

            },**/
			async initAllOrderList() {
			  const {data: res} = await uni.$http.get('/wx/orders/getAllorderList')
			  if (res.status != 200) return uni.$showMsg('查詢未裝箱訂單列表失败!')
			   console.log('res:', res.data)
			   this.updateOrderList(res.data)  
			},
			
			async initCatTree() {
			    const {data: res} = await uni.$http.get('/wx/orders/catlist')
			    if (res.status != 200) return uni.$showMsg('查詢商品類別列表失败!')
			     console.log('res:', res.data)
			     this.updateCatTree(res.data)
			},   
            async initOrders() {
                const {
                    data: res
                } = await uni.$http.get('/wx/orders/getAllOrderListByOpenId?openId=' + this.openid)
                if (res.status !== 200) return uni.$showMsg()
                this.orderList = res.data
                this.updateOrderListByOpenId(res.data)
                this.initOrderList()

            },

            initOrderList() {
                this.ordersNonValide = this.orderList.filter(x => x.orderStatus === 2)
                this.setOrdersNonValide(this.ordersNonValide)
                this.ordersNonPayer = this.orderList.filter(x => x.orderStatus === 1)
                this.setOrdersNonPayer(this.ordersNonPayer)
                this.ordersNonLivrer = this.orderList.filter(x => x.payStatus === 20)
                this.setOrdersNonLivrer(this.ordersNonLivrer)
                this.ordersRembourse = this.orderList.filter(x => x.payStatus === 40)
                this.setOrdersRembouse(this.ordersRembourse)

            },
			
			async getWarehouseRequest() {
				const {
				    data: res
				} = await uni.$http.get('/wx/users/getWarehouseRequestByOpenId?openId=' + this.openid)
				if (res.status !== 200) return uni.$showMsg()
				this.warehouseRequestList = res.data
				
				this.updateWarehouseRequestByOpenId(res.data)
			},
			
			async getuserInfo() {
				const {
				    data: res
				} = await uni.$http.get('/wx/users/getUserinfos/' + this.openid)
				if (res.status !== 200) return uni.$showMsg()
				this.updateUserInfo(res.data)
			}

		
        }
    }
</script>

<style lang="scss">
    page,
    .my-container {
        height: 100%;
    }
</style>