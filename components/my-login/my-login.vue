<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>

		<!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button> -->
		<button type="primary" class="btn-login" @click="login()">登录</button>
		<text class="tips-text">申请获取以下权限</text>
		<text class="tips-text">获得您的公开信息(昵称、头像、地区等)</text>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
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
			...mapState('m_user', ['token', 'openid','userinfo','tabBarList'])
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateOpenid', 'updateSwiperList', 'updateToken',
				'updateAddress', 'updatePickPoint', 'updateCode', 'updateTabBarList','updatePickPointList','updateDepartureDateList'
			]),
			...mapMutations('m_order', ['setOrdersNonValide', 'setOrdersNonPayer', 'setOrdersNonLivrer',
				'setOrdersRembouse',  'updateWarehouseRequest', 'updateCatTree',
				'updateOrderList'
			]),

			//用户授权之后，获取用户的基础信息
			getUserInfo(e) {
				if (e.detail.errMsg == 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权!')
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail.userInfo)
			},
			
			login() 
			{
				var that = this
				uni.showModal({
					mask:true,
					title:'温馨提示',
					content:'授权微信登录之后才能正常使用小程序功能',
					success(res) {
						if(res.confirm) {
							uni.showLoading({
							    title:'开始登录...'
							})
							uni.getUserProfile({
								desc:'获取您的昵称、头像',
								success: userRes => {
									if(userRes.errMsg == 'getUserProfile:ok' && userRes.userInfo != undefined) {
										console.log('userInfo:', userRes.userInfo)
										that.updateUserInfo(userRes.userInfo)
										that.getToken(userRes.userInfo)
									}else {
										uni.showToast({
											icon:"none",
											title:"获取失败，请重试"
										})
									}
								}
								
							})
						}
					}
				})
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

				const {
					data: result
				} = await uni.$http.get('/wx/users/login', query);
				if (result.status !== 200) return uni.$showMsg(result.msg)
				this.updateToken(result.data.token)
				this.updateOpenid(result.data.openid)
				this.updateUserInfo(result.data)
				this.initTabBar(result.data)
				
				
				if (result.data.userRoles == 3) {
					this.updateAddress(result.data.address)
					this.updateCode(result.data.code)
					this.updatePickPoint(result.data.ppName)
					this.initSwiperDate()
				}


				//获取后台返回的token,保存到storage中
				uni.$showMsg('登录成功!')
				this.getWarehouseRequest()
				this.initCatTree()
				this.initpickpoinsTree()
				this.initDepartureDateList()

 
			},

			async initCatTree() {
				const {
					data: res
				} = await uni.$http.get('/wx/orders/catlist')
				if (res.status != 200) return uni.$showMsg('查询商品类别列表失败!!!')
				this.updateCatTree(res.data)
			},

		
			initTabBar(userInfo) {
				if (userInfo.userRoles == 3) {
					this.updateTabBarList( getApp().globalData.clientTabBarList )
				} else if( userInfo.userRoles == 2 ){
					this.updateTabBarList( getApp().globalData.adminTabBarList )
					uni.switchTab({
					    url: '/'+ this.tabBarList[0].path
					})
				} else {
					this.updateTabBarList( getApp().globalData.rootTabBarList )
				}
			},
			
			async initSwiperDate() {
				this.updateSwiperList(getApp().globalData.imageList)
				this.initOrders()

			},

			async initOrders() {
				const {
					data: res
				} = await uni.$http.get('/wx/orders/getAllOrderListByCode?code=' + this.userinfo.code)
				if (res.status !== 200) return uni.$showMsg()
				this.orderList = res.data
				this.updateOrderList(res.data)
				this.initOrderList()

			},

			initOrderList() {
			    this.ordersNonValide = this.orderList.filter(x => x.orderStatus === 2)
			    this.setOrdersNonValide(this.ordersNonValide)
				
			    this.ordersNonPayer = this.orderList.filter(x => x.orderStatus === 1 && x.payStatus === 10)
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
			
			async initpickpoinsTree() {
				    const {data: res} = await uni.$http.get('/wx/users/pickPointList')
				    if (res.status != 200) return uni.$showMsg('查询提货点列表失败!')
				     this.updatePickPointList(res.data)
			},
			
			async initDepartureDateList(){
				const {data: res} = await uni.$http.get('/wx/cabinet/departureDateList')
				if (res.status != 200) return uni.$showMsg('查询出海日期列表失败!')
				 this.updateDepartureDateList(res.data)
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