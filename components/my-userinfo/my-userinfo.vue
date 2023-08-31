<template>
    <view class="my-userinfo-container">
        <!-- 头像昵称区域 -->
     <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
         <swiper-item v-for="(item,i) in swiperList" :key="i">
             <navigator class="swiper-item" :url="'/subpkg/orders_detail/orders_detail?goods_id=' + item.goods_id">
                 <image :src="item.image_src"></image>
            </navigator>
         </swiper-item>
     </swiper>
        <!-- list -->
        <view class="panel-list">
         <view class="panel">
             <view class="panel-body">
                 <view class="panel-item">
                     <text>mt_10</text>
                     <text>我的提货码</text>  
                 </view>
                 <view class="panel-item">
                     <text>南岸</text>
                     <text>我的送货分区</text>  
                 </view>
                 <view class="panel-item">
                     <text>64</text>
                     <text>我的总订单数</text>  
                 </view>
                 <view class="panel-item">
                     <text>824$</text>
                     <text>我的总支付金额</text>  
                 </view>
                 
             </view>
             
         </view> 
           
           <view class="panel">
               <view class="panel-title">
                   我的订单
               </view>
               <view class="panel-body">
                   <view class="panel-item">
                       <image src="/static/c1.png" class="icon"></image>
                       <text>待付款</text>
                   </view>
                   <view class="panel-item">
                       <image src="/static/c2.png" class="icon"></image>
                       <text>待发货</text>
                   </view>
                   <view class="panel-item">
                       <image src="/static/c3.png" class="icon"></image>
                       <text>退款/退货</text>
                   </view>
                   <view class="panel-item">
                       <image src="/static/c4.png" class="icon"></image>
                       <text>全部订单</text>
                   </view>
               </view>
               
           </view>
           
           <view class="panel">
               <view class="panel-list-item">
                   <text>收货地址</text>
                   <uni-icons type="arrowright" size="15"></uni-icons>
               </view>
               <view class="panel-list-item">
                   <text>联系客服</text>
                   <uni-icons type="arrowright" size="15"></uni-icons>
               </view>
               <view class="panel-list-item" @click="logout">
                   <text>推出登陆</text>
                   <uni-icons type="arrowright" size="15"></uni-icons>
               </view>     
           </view>
                
        </view>
   
    </view>
</template>

<script>
    import { mapState , mapMutations} from 'vuex'
    export default {
        data() {
            return {
            };
        },
        
        computed: {
            ...mapState('m_user', ['userinfo', 'swiperList']) 
        },
        
        methods: {
            ...mapMutations('m_user',['updateUserInfo','updateOpenid']),
       async  logout() {
      const[err, succ]  =   await  uni.showModal({
                 title:'提示',
                 content:'确认推出登陆吗?'
             }).catch(err => err) 
             
             if(succ && succ.confirm) {
                 this.updateUserInfo({}),
                 this.updateOpenid('')
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