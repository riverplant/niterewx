<template>
    <view>
        <view class="search-box">
              <uni-search-bar placeholder="输入订单号查找订单" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />  
            </view>
            <uni-nav-bar v-if="type === 1" dark :fixed="true" shadow background-color="#1f2a66" status-bar  
            	 color="#fff" >
                <button type="primary">支付订单</button>
            </uni-nav-bar>
           <view class="sugg-list">
               <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
                  <view class="goods-name">
                    id:{{item.id}} | trackingNumber: {{item.trackingNumber}} | catName: {{item.catName}} | price: {{item.price | tofixed}}
                  </view> 
                    <uni-icons type="arrowright" size="16"></uni-icons>
               </view>
        </view>

    </view>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                wh:0,
                timer: null,
                kw: '',
                searchResults:[],
                searchResultsBak:[],
                type:1,

                queryObj:{
                    code:'',
                    id:'',
                    pageNum:1,
                    pageSize:10,
                    orderStatus:1,
                    payStatus:10   
                },
                total:0,
                isloading:false

            };
        },
        filters: {
            tofixed(num) {
                return Number(num).toFixed(2)
            }
        },
        computed: {
            ...mapState('m_user', ['code']),
             ...mapState('m_order', ['ordersNonValide','ordersNonPayer','ordersNonLivrer','ordersRembourse'])
        },
        onLoad(e) {
             this.type = e.type;
             this.initSearchresult()
            console.log('type:',this.type)
            /** if(this.type === 1) {
               this.searchResults = this.ordersNonValide
             }else if(this.type === 2) {
                     this.searchResults = this.ordersNonPayer
                 }else if(this.type === 3) {
                     this.searchResults = this.ordersNonLivrer
                 }else {
                    this.searchResults = this.ordersRembourse  
                 } 
         **/
             
             const sysInfo =  uni.getSystemInfoSync()
            this.wh = sysInfo.windowHeight - 50
            this.searchResultsBak = this.searchResults
        },
        methods: {       
            search(res) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.kw = res,
                   this.getSearchResults() 
                }, 500)
             },  
   
        initSearchresult() {
            this.searchResults = [
           {"id":"001","catName":"一般商品","trackingNumber":"000000001","price": "51$"},
           {"id":"002","catName":"一般商品","trackingNumber":"000000002","price": "55.23$"},
           {"id":"003","catName":"一般商品","trackingNumber":"000000003","price": "50.25$"},
           {"id":"004","catName":"一般商品","trackingNumber":"000000004","price": "43.25$"},
           {"id":"005","catName":"一般商品","trackingNumber":"000000005","price": "40.25$"},
           {"id":"006","catName":"一般商品","trackingNumber":"000000006","price": "60.00$"},
           {"id":"001","catName":"一般商品","trackingNumber":"000000001","price": "151$"},
           {"id":"002","catName":"一般商品","trackingNumber":"000000002","price": "155.23$"},
           {"id":"003","catName":"一般商品","trackingNumber":"000000003","price": "150.2533$"},
           {"id":"004","catName":"一般商品","trackingNumber":"000000004","price": "143.25$"},
           {"id":"005","catName":"一般商品","trackingNumber":"000000005","price": "140.25$"},
           {"id":"006","catName":"一般商品","trackingNumber":"000000006","price": "160.00$"},
           {"id":"001","catName":"一般商品","trackingNumber":"000000001","price": "51$"},
           {"id":"002","catName":"一般商品","trackingNumber":"000000002","price": "55.23$"},
           {"id":"003","catName":"一般商品","trackingNumber":"000000003","price": "50.25$"},
           {"id":"004","catName":"一般商品","trackingNumber":"000000004","price": "43.25$"},
           {"id":"005","catName":"一般商品","trackingNumber":"000000005","price": "40.25$"},
           {"id":"006","catName":"一般商品","trackingNumber":"000000006","price": "60.00$"},
           {"id":"001","catName":"一般商品","trackingNumber":"000000001","price": "51$"},
           {"id":"002","catName":"一般商品","trackingNumber":"000000002","price": "55.23$"},
           {"id":"003","catName":"一般商品","trackingNumber":"000000003","price": "50.2533$"},
           {"id":"004","catName":"一般商品","trackingNumber":"000000004","price": "43.25$"},
           {"id":"005","catName":"一般商品","trackingNumber":"000000005","price": "40.25$"},
           {"id":"006","catName":"一般商品","trackingNumber":"000000006","price": "60.00$"}
            ]  
         },
        getSearchResults() {  
        this.isloading = true
           if(this.kw === '') {
             this.searchResults = this.searchResultsBak  
           }else {
             this.searchResults = this.searchResults.filter( item=> item.id.indexOf( this.kw ) > -1 );   
           }
          
      /**
          if(this.code !== '')  {
              if(this.kw === '') {
                 this.searchResults = this.searchResultsBak 
              }else {
                 this.searchResults = this.searchResults.filter(function (item) { return item.id.indexOf(this.kw)>-1; });     
              }
              this.isloading = false      
              //调用回调函数
              cb && cb()
              this.total = this.searchResults.length
          }
           
        **/
       
                   
     },
     gotoDetail(item) {
         uni.navigateTo({
             url: '/subpkg/orders_detail/orders_detail?item=' + JSON.stringify(item)
         })
     }
        }
    }
</script>

<style lang="scss">
    .search-box {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: #C00000;
    }

.sugg-list {
    padding: 0 5px;
    .sugg-item {
        font-size: 12px;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .goods-name {
            // 文字不容许换行
            white-space: nowrap;
            overflow: hidden;
            // 文字溢出使用...
            text-overflow: ellipsis;
            margin-right: 3px;
        }
    }
}
</style>
