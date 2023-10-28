<template>
    <view class="my-container">
        <my-login v-if="!token"></my-login>
        <my-userinfo v-else></my-userinfo>
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
                this.initSwiperDate()
				this.getWarehouseRequest()
				this.getuserInfo()
            }
        },
        computed: {
            ...mapState('m_user', ['token', 'openid'])
        },
        methods: {
            ...mapMutations('m_user', ['updateSwiperList','updateUserInfo']),
            ...mapMutations('m_order', ['setOrdersNonValide', 'setOrdersNonPayer', 'setOrdersNonLivrer',
                'setOrdersRembouse', 'updateOrderListByOpenId','updateWarehouseRequestByOpenId', 'updateClaimList'
            ]),

            async initSwiperDate() {
                const {
                    data: result
                } = await uni.$http.get('https://www.uinav.com/api/public/v1/home/swiperdata')
                if (result.meta.status !== 200) return uni.$showMsg()
                console.log('swiperdata:', result.message)
                this.updateSwiperList(result.message)
                this.initOrders()

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
				console.log('res.status:', res.data)
				if (res.status !== 200) return uni.$showMsg()
				this.warehouseRequestList = res.data
				
				this.updateWarehouseRequestByOpenId(res.data)
			},
			
			async getuserInfo() {
				const {
				    data: res
				} = await uni.$http.get('/wx/users/getUserinfos/' + this.openid)
				console.log('res.status:', res.data)
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