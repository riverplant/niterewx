<template>
    <view class="my-container">
        <my-login v-if="!token"></my-login>
        <my-userinfo v-if="userinfo.userRoles == 3"></my-userinfo>
		<root-printer v-if="userinfo.userRoles == 5"></root-printer>
      <tabBar :current="2"></tabBar>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
	import Bluetooth from '@/subpkg/print/js/bluetooth.js'
    export default {
        data() {
            return {
                items: [],
                ordersNonValide: [],
                ordersNonPayer: [],
                ordersNonLivrer: [],
                ordersRembourse: [],
				warehouseRequestList: [],
				userRole: 0,
				bluetooth: new Bluetooth(),
            }
        },
        
        onShow() {
            if (this.token) {
				if(this.userinfo.userRoles === 3) {
				  this.getWarehouseRequest()	
				}
				this.getuserInfo()
			    this.initOrdersByOpenId()	
            }
        },
		
		onUnload() {
			this.bluetooth.closeBLEConnection();
		    this.bluetooth.closeBluetoothAdapter();
				},
		onLoad(e) {
		    if(this.userinfo.userRoles == 5) 
			{
				this.bluetooth.openBluetoothAdapter();
			} 
		    },
        computed: {
            ...mapState('m_user', ['token', 'openid','userinfo']),
			...mapState('m_order', ['orderList'])
        },
        methods: {
            ...mapMutations('m_user', ['updateSwiperList','updateUserInfo']),
            ...mapMutations('m_order', ['setOrdersNonValide', 'setOrdersNonPayer', 'setOrdersNonLivrer',
                'setOrdersRembouse', 'updateWarehouseRequest', 'updateClaimList','updateOrderList','updateCatTree'
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
			},   
            async initOrdersByOpenId() {
                const {
                    data: res
                } = await uni.$http.get('/wx/orders/getAllOrderListByOpenId?openid=' + this.userinfo.openid)
                if (res.status !== 200) return uni.$showMsg()
				this.items = res.data
                this.updateOrderList(res.data)
                this.initOrderList()

            },

            initOrderList() {
                this.ordersNonValide = this.orderList.filter(x => x.orderStatus === 2)
                this.setOrdersNonValide(this.ordersNonValide)
				
                this.ordersNonPayer = this.orderList.filter(x => x.orderStatus === 1 && x.payStatus === 10)
				console.log(' this.ordersNonPayer:', this.ordersNonPayer)
                this.setOrdersNonPayer(this.ordersNonPayer)
				
                this.ordersNonLivrer = this.orderList.filter(x => x.orderStatus === 1 && x.payStatus === 20)
                this.setOrdersNonLivrer(this.ordersNonLivrer)
				
                this.ordersRembourse = this.orderList.filter(x => x.orderStatus === 1 && x.payStatus === 30)
                this.setOrdersRembouse(this.ordersRembourse)

            },
			
			async getWarehouseRequest() {
				const {
				    data: res
				} = await uni.$http.get('/wx/users/getWarehouseRequestByOpenId?openId=' + this.openid)
				if (res.status !== 200) return uni.$showMsg()
				this.warehouseRequestList = res.data
				
				this.updateWarehouseRequest(res.data)
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