<template>
    <view class="my-userinfo-container">
        <!-- 头像昵称区域 -->
     <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
         <swiper-item v-for="(item,i) in swiperList" :key="i">
             <view class="swiper-item">
                 <image :src="item.image_src"></image>
            </view>
         </swiper-item>
     </swiper>
        <!-- list -->
        <view class="panel-list">
         <view class="panel">
             <view class="panel-body">
				 <view class="panel-item" >
					<text class="sub-item-title">我的提货码</text> 
					<text class="sub-item-text1" v-if="userinfo.code === null">请选择仓库获得提货码 </text>
				 	<text class="sub-item-text1" v-else>{{userinfo.code}} </text>
				 </view>
				 <view class="panel-item" >
					 <text class="sub-item-title">我的送货分区</text> 
					  <text class="sub-item-text2" v-if="userinfo.code === null" >無</text> 
				     <text class="sub-item-text2"  v-else>{{userinfo.ppName}}</text> 

				 </view>
             </view>
             
         </view> 
           
           <view class="panel">
               <view class="panel-title">
                   我的包裹
               </view>
               <view class="panel-body">
                   <uni-badge size="small" :max-num="value" :text="ordersNonValideTotal" absolute="rightTop" >
                   <navigator class="panel-item" :url="'/subpkg/orders/orders?type='+1">
                           
								<image src="/static/icon-my-order-01.png" class="icon"></image>
                               <text>验货未通过</text>
                   </navigator>
                   </uni-badge>
                   <uni-badge size="small" :max-num="value" :text="count" absolute="rightTop" >
                       <navigator class="panel-item" :url="'/subpkg/orders/orders?type='+2">
                                   <image src="/static/icon-my-order-02.png" class="icon"></image>
                                   <text>待付款</text>
                       </navigator>
                       </uni-badge>
                       
                    <uni-badge size="small" :max-num="value" :text="noLivreCount" absolute="rightTop" >
                    <navigator class="panel-item" :url="'/subpkg/orders/orders?type='+3">
                                <image src="/static/icon-my-order-03.png" class="icon"></image>
                                <text>待发货</text>
                     </navigator>
                     </uni-badge>
                                 
                     <uni-badge size="small" :max-num="value" :text="ordersRembourseCount" absolute="rightTop" >
                    <navigator class="panel-item" :url="'/subpkg/orders/orders?type='+5">
                                <image src="/static/icon-my-order-05.png" class="icon"></image>
                                <text>退款/退货</text>
                    </navigator>
                     </uni-badge>
               </view>
               
           </view>
           
           <view class="panel">
                <navigator  :url="'/subpkg/address/address'">
                    <view class="panel-list-item">
                         <text v-if="userinfo.code == null" >创建个人信息和仓库</text>
						  <text v-else >变更个人信息和仓库</text>
                              <uni-icons type="arrowright" size="15"></uni-icons> 
                    </view> 
                </navigator>
				
				<navigator class="panel-item" url="/subpkg/info/support-qr/support-qr">
               <view class="panel-list-item">
                   <text>联系客服</text>
                   <uni-icons type="arrowright" size="15"></uni-icons>
               </view>   
			   </navigator>
			   <view class="panel-list-item" @click="openMsg">
			       <text>消息订阅【请开启订阅所有消息!!】</text>
			       <uni-icons type="arrowright" size="15"></uni-icons>
			   </view>  
			   <view class="panel-list-item" @click="logout">
			       <text>退出登录</text>
			       <uni-icons type="arrowright" size="15"></uni-icons>
			   </view>  
           </view>
                
        </view>
   
    </view>
</template>

<script>
    import { mapState , mapMutations, mapGetters} from 'vuex'
    export default {
        data() {
            return {
                value:99           
            };
        },
		computed: {
		    ...mapState('m_user', ['userinfo', 'swiperList','code', 'pickPoint','accessToken']),
		    ...mapGetters('m_order', ['checkedCount', 'count', 'noLivreCount','ordersNonValideTotal', 'ordersRembourseCount', 'orderCount'])
		},
		methods: {
			...mapMutations('m_user', [ 'updateUserInfo', 'updateOpenid', 'updateCode', 'updateToken', 'updateAddress', 'updateAccessToken']),
			
			openMsg() {
				
				var _this = this
				_this.getAccesToken() 
			},
			//获取access_token 8小时
			async getAccesToken() 
			{
				const[err,succ] = await uni.showModal({
					title:'提示',
					content:'确认开启消息订阅？',
					
				}).catch(err => err)	
				
				if(succ && succ.confirm) {
				const { data: res } = await uni.$http.get('/wx/users/acessToken')
				if (res.status != 200) return uni.$showMsg('获取acessToken失败!!!')
				this.updateAccessToken(res.data)
				
				this.getSetting()
				}
		
			},
			
			 getSetting() 
			{
				var that = this
				let tmpls = getApp().globalData.tmpls
	             uni.getSetting({
					   success(res) {  
						  uni.requestSubscribeMessage({
						    tmplIds: tmpls.map(item=>item.id),
						    success (res) {
								console.log('res:',res)
							    const map = new Map(Object.entries(res))
								const queryItems = []

								for (let [key, value] of map) {
									if(key && key !== 'errMsg' && value === 'accept' ) {
										 for (let i = 0; i < tmpls.length; i++) {
											if(tmpls[i].id === key) {
												queryItems.push({'tmplId': key,  'name':tmpls[i].name})
											}
											
										 }
										
									}
								    
								}
								let openid = uni.getStorageSync('openid')
								const query = {'openid':openid,'items':queryItems}
                                 that.messageSubscription(query)
								},
							fail(res) {console.log('fail:',res)},
							complete:(res)=> { console.log('complete.........................')}
						  })
					   }
					})
			},
			
			async messageSubscription(query){
				console.log('query:',query)
				const {
						data: result
					} = await uni.$http.post('/wx/users/messagesubscription', query);
					if (result.status !== 200) return uni.$showMsg(result.msg)
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
					this.getWarehouseRequest()
				}
			
			
				//获取后台返回的token,保存到storage中
				uni.$showMsg('登录成功!')
				this.initCatTree()
				this.initpickpoinsTree()
				this.initDepartureDateList()
			
			 
			},
			
			async logout(){
			const[err,succ] = await uni.showModal({
				title:'提示',
				content:'确认退出登录吗？',
				
			}).catch(err => err)	
			
			if(succ && succ.confirm) {
				this.updateUserInfo({})
				this.updateOpenid('')
				this.updateCode('')
				this.updateToken('')
				this.updateAddress({})
			}
			}
			
		}
       
    }
</script>

<style lang="scss">
    
    .my-userinfo-container {
        height: 100%;
        background-color: #f4f4f4;
        swiper{
            height: 180px;
            .swiper-item,
             image {
                 width: 100%;
                 height: 100%;
             }
        }
        .top-box {
            height: 160px;
            background-color: #C00000;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .avatar {
                width: 90px;
                height: 90px;
                border-radius: 45px;
                border: 2px solid #FFF;
                box-shadow: 0 1px 5px black;
            }
            .nickname {
                font-size: 16px;
                color: #fff; 
                font-weight: bold;
                margin-top: 10px;
            }
        }
    }
.panel-list {
    padding: 0 10px;
    position: relative;
    top: -5px;
    .panel {
        background-color: white;
        border-radius: 3px;
        margin-bottom: 8px;
        .panel-title {
            line-height: 45px;
            padding-left: 10px;
            font-size: 15px;
            border-bottom: 1px solid #F4F4F4;
        }
      .panel-body {
          display: flex;
          justify-content: space-around;
          .panel-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              padding: 10px 0;
              font-size: 13px;
              
              .icon {
                  width: 35px;
                  height: 35px;
              }
			  .sub-item-title {
			  	margin-top: 10rpx;
			  	margin-bottom: 10rpx;
			  	margin-left: 30rpx;
			  	margin-right: 30rpx;
			  	display: flex;
			  	justify-content: space-between;
			  	align-items: center;
				font-size: 20rpx;
				color: #aaaaaa
			  	}
			  .sub-item-text1 {
			  	display: flex;
			  	flex-direction: column;
			  	justify-content: space-between;
				font-size: 30rpx;
				font-weight: 800;
				color: #ee9900
			  	}
				.sub-item-text2 {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					}
          }
      }  
    }
}
.panel-list-item{
   display: flex; 
   justify-content: space-between;
   align-items: center;
   font-size: 15px;
   padding: 0 10px;
   line-height: 45px;
}

</style>