<template>
    <view class="login-container">
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>

        <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
        <text class="tips-text">申请获取以下权限</text>
        <text class="tips-text">获得你的公开信息(昵称、头像、地区等)</text>
  </view>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    export default {
        name: "my-login",
        data() {
            return {
				orderList: [],
				ordersNonValide: [],
				ordersNonPayer: [],
				ordersNonLivrer: [],
				ordersRembourse: [],
				warehouseRequestList: []
            };
        },
		computed: {
		    ...mapState('m_user', ['token', 'openid'])
		},
        methods: {
            ...mapMutations('m_user',['updateUserInfo','updateOpenid','updateSwiperList', 'updateToken','updateAddress', 'updatePickPoint', 'updateCode','updateTabBarList']),
           ...mapMutations('m_order',['setOrdersNonValide','setOrdersNonPayer','setOrdersNonLivrer','setOrdersRembouse', 'updateOrderListByOpenId','updateWarehouseRequestByOpenId','updateCatTree','updateOrderListWithoutBoxId']),
	
            //用户授权之后，获取用户的基础信息
            getUserInfo(e) {
                if (e.detail.errMsg == 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权!')
                this.updateUserInfo(JSON.stringify(e.detail.userInfo))
                console.log('userInfo:',e.detail.userInfo)
                this.getToken(e.detail.userInfo)
            },
            async getToken(info) {
                const [err, res] = await uni.login().catch(err => err)
                if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登陆失败')

                const query = {
                   'avatarUrl': info.avatarUrl,
                   'nickName': info.nickName,
                   'js_code': res.code,
                   'gender': info.gender
                }
                
            const { data:result } =   await uni.$http.get('/wx/users/login', query );
              if( result.status !== 200 ) return uni.$showMsg( result.msg )     
              this.updateToken(result.data.token)
              this.updateOpenid(result.data.openid)
              this.updateAddress(result.data.address)
			   this.updateUserInfo(JSON.stringify(result.data))
			   this.updateCode(result.data.code)
			   this.updatePickPoint(result.data.ppName)
 
            //获取后台返回的token,保存到storage中
            uni.$showMsg('登录成功!')
			//this.initSwiperDate()
			this.getWarehouseRequest()
			this.initTabBar(result.data)
			this.initCatTree()
			this.initOrderListWithoutBoxId()
            } ,
			
			async initCatTree() {
			    const {data: res} = await uni.$http.get('/wx/orders/catlist')
			    if (res.status != 200) return uni.$showMsg('查詢商品類別列表失败!')
			     console.log('res:', res.data)
			     this.updateCatTree(res.data)
			} ,
			
			async initOrderListWithoutBoxId() {
			  const {data: res} = await uni.$http.get('/wx/orders/orderListWithoutBoxId')
			  if (res.status != 200) return uni.$showMsg('查詢未裝箱訂單列表失败!')
			   console.log('res:', res.data)
			   this.updateOrderListWithoutBoxId(res.data)  
			},
			initTabBar(userInfo) {
				if(userInfo.userRoles == 3) {
					this.updateTabBarList( getApp().globalData.clientTabBarList )
				}else {
					this.updateTabBarList( getApp().globalData.adminTabBarList )
				}
				console.log("tabBarList:", getApp().globalData.clientTabBarList)
			},
				
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
			    console.log('res.status:', res.status)
			    if (res.status !== 200) return uni.$showMsg()
			    this.orderList = res.data
			    this.updateOrderListByOpenId(res.data)
			    this.initOrderList()
			
			},
			
			initOrderList() {
			    console.log('ordrelist:', this.orderList)
			    this.ordersNonValide = this.orderList.filter(x => x.orderStatus === 2)
			    this.setOrdersNonValide(this.ordersNonValide)
			    this.ordersNonPayer = this.orderList.filter(x => x.orderStatus === 1)
			    console.log('ordersNonPayer:', this.ordersNonPayer)
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
			}
        }
    }
</script>

<style lang="scss">
    .login-container {
        height: 550px;
        background-color: #F8F8F8;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 40px;
            background-color: white;
            position: absolute;
            bottom: 0;
            left: 0;
            border-radius: 100%;
            transform: translateY(50%);
        }

        .btn-login {
            width: 90%;
            border-radius: 100px;
            margin: 15px 0;
            background-color: #C00000;
        }

        .tips-text {
            font-size: 12px;
            color: gray;
        }
    }
</style>
