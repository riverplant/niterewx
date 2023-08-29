<template>
    <view>
       <!--轮播图-->
       <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
           <swiper-item v-for="(item,i) in swiperList" :key="i">
               <navigator class="swiper-item" :url="'/subpkg/orders_detail/orders_detail?goods_id=' + item.goods_id">
                   <image :src="item.image_src"></image>
              </navigator>
           </swiper-item>
       </swiper>
       
       <view class="nav-list">
           <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
               <image :src="item.image_src" class="nav-img"></image>
           </view>
           
       </view>
    </view>
</template>

<script>
import { $http } from '@escook/request-miniprogram';
    export default {
        data() {
            return {
              // 轮播图的数据列表
                swiperList:[],
                navList:[]
            };
        },
        onLoad() {
            this.getSwiperList()
            this.getNavList()
        },
        methods:{
          async  getSwiperList() {
              const { data:res } =  await uni.$http.get('/api/public/v1/home/swiperdata')
              if( res.meta.status !== 200 ) return uni.$showMsg()  
              this.swiperList = res.message
              uni.$showMsg('数据请求成功')
            },
            
            async getNavList() {
                const { data:res } =  await uni.$http.get('/api/public/v1/home/catitems')
                if( res.meta.status !== 200 ) return uni.$showMsg()  
                this.navList = res.message
                uni.$showMsg('数据请求成功')
            },
            navClickHandler(item) {
                if(item.name === '分类')
                uni.switchTab({
                    url:'/pages/cate/cate'
                })
            }
        }
    }
</script>

<style lang="scss">
swiper{
    height: 180px;
    .swiper-item,
     image {
         width: 100%;
         height: 100%;
     }
}

.nav-list{
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
}
.nav-img{
    width: 128rpx;
    height: 140rpx;
}
</style>
