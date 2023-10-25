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
				 	<text class="sub-item-text1">{{userinfo.code}} </text>
				 </view>
				 <view class="panel-item" >
					 <text class="sub-item-title">我的送货分区</text> 
				     <text class="sub-item-text2">{{userinfo.ppName}}</text> 

				 </view>
             </view>
             
         </view> 
           
           <view class="panel">
               <view class="panel-title">
                   我的订单
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
                       
                    <uni-badge size="small" :max-num="value" :text="this.ordersNonLivrer.lenght" absolute="rightTop" >
                    <navigator class="panel-item" :url="'/subpkg/orders/orders?type='+3">
                                <image src="/static/icon-my-order-03.png" class="icon"></image>
                                <text>待发货</text>
                     </navigator>
                     </uni-badge>
                                 
                     <uni-badge size="small" :max-num="value" :text="this.ordersRembourse.lenght" absolute="rightTop" >
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
                         <text>完善個人信息</text>
                              <uni-icons type="arrowright" size="15"></uni-icons> 
                    </view> 
                </navigator>
				
               <navigator  :url="'/subpkg/warehouse/warehouse'">
               <view class="panel-list-item">
                   <text v-if="code == '无'" >申请仓库</text>
				    <text v-else >申请修改仓库</text>
                   <uni-icons type="arrowright" size="15"></uni-icons>
               </view>
                </navigator>
				<navigator class="panel-item" url="/pages/info/support-qr/support-qr">
               <view class="panel-list-item">
                   <text>联系客服</text>
                   <uni-icons type="arrowright" size="15"></uni-icons>
               </view>   
			   </navigator>
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
            ...mapState('m_user', ['userinfo', 'swiperList','code', 'pickPoint']),
            ...mapGetters('m_order', ['checkedCount', 'count', 'ordersNonValideTotal', 'orderCount'])
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