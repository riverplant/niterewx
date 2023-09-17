<template>
    <view>
        <view class="search-box">
              <uni-search-bar placeholder="输入订单号查找订单" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />  
            </view>
            <!--订单标题区域-->
           <view class="order-title">
               <!--左侧得图标-->
                <uni-icons type="shop" size="18"></uni-icons>
               <!--右侧得文本-->
               <text class="order-title-text">{{title}}订单</text>
           </view>
         <uni-swipe-action>
              <block v-for="(item,i) in searchResults" :key='i'>
             <uni-swipe-action-item :right-options="options" @click="">
                  <order-item :order="item" :show-price="isShowPriceAndRadio" :show-radio="isShowPriceAndRadio" @radio-change="radioChangeHandler"></order-item>
             </uni-swipe-action-item>
             </block>
         </uni-swipe-action>
    </view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                //右侧滑动删除时显示得文本
                options:[{
                    text:'删除',
                    style: {
                        backgroundColor: '#C00000'
                    }
                }],
                wh:0,
                timer: null,
                kw: '',
                searchResults:[],
                searchResultsBak:[],
                type:1,
                title:'',
                isShowPriceAndRadio:false,

                queryObj:{
                    code:'',
                    id:'',
                    pageNum:1,
                    pageSize:10,
                    orderStatus:1,
                    payStatus:10   
                },
                total:0,
                isloading:true,
               
                

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
             this.type = e.type
            this.initSearchresult()
           /**
             if(this.type === '1') {
               this.searchResults = this.ordersNonValide
               this.title = "支付未通过"
                this.isShowPriceAndRadio = false
             }else if(this.type === '2') {
                     this.searchResults = this.ordersNonPayer
                     this.title = "未支付"
                     this.isShowPriceAndRadio = true
                 }else if(this.type === '3') {
                     this.searchResults = this.ordersNonLivrer
                      this.title = "已支付未发货"
                       this.isShowPriceAndRadio = false
                 }else {
                    this.searchResults = this.ordersRembourse 
                     this.title = "支付失败/退款/退货" 
                       this.isShowPriceAndRadio = false
                 } 
         **/
         
          if(e.type === '1') {
               this.title = "支付未通过"
               this.isShowPriceAndRadio = false
             }else if(e.type === '2') {
                     this.title = "未支付"
                     this.isShowPriceAndRadio = true
                 }else if(e.type === '3') {
                     this.title = "已支付未发货"
                     this.isShowPriceAndRadio = false
                 }else {
                   this.title = "支付失败/退款/退货" 
                    this.isShowPriceAndRadio = false
                 } 
         
            const sysInfo =  uni.getSystemInfoSync()
            this.wh = sysInfo.windowHeight - 50
            this.searchResultsBak = this.searchResults
        },
        methods: {    
            ...mapMutations('m_order',['updateOrderState']),
            swipeActionClickHandler(item) {
                
            },
            search(res) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.kw = res,
                   this.getSearchResults() 
                }, 500)
             },  
   
        initSearchresult() {
            this.searchResults = [
           {"id":"001","catName":"一般商品","trackingNumber":"000000001","price": "51", "pLong":"22.02", "pWidth":"15.02",
           "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
           {"id":"002","catName":"一般商品","trackingNumber":"000000002","price": "55.23", "pLong":"22.02", "pWidth":"15.02",
           "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": false},
           {"id":"003","catName":"一般商品","trackingNumber":"000000003","price": "50.25", "pLong":"22.02", "pWidth":"15.02",
           "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
           {"id":"004","catName":"一般商品","trackingNumber":"000000004","price": "43.25", "pLong":"22.02", "pWidth":"15.02",
           "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
           {"id":"005","catName":"一般商品","trackingNumber":"000000005","price": "40.25", "pLong":"22.02", "pWidth":"15.02",
           "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
           {"id":"006","catName":"一般商品","trackingNumber":"000000006","price": "60.00", "pLong":"22.02", "pWidth":"15.02",
           "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
           {"id":"001","catName":"一般商品","trackingNumber":"000000001","price": "151", "pLong":"22.02", "pWidth":"15.02",
           "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
           {"id":"002","catName":"一般商品","trackingNumber":"000000002","price": "155.23", "pLong":"22.02", "pWidth":"15.02",
           "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true}

           
            ]  
         },
         
        getSearchResults() {  
        this.isloading = true
           if(this.kw === '') {
             this.searchResults = this.searchResultsBak  
           }else {
             this.searchResults = this.searchResults.filter( item=> item.id.indexOf( this.kw ) > -1 );   
           }
          
      
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
     },
     gotoDetail(item) {
         uni.navigateTo({
             url: '/subpkg/orders_detail/orders_detail?item=' + JSON.stringify(item)
         })
     },
     radioChangeHandler(e) {
         this.updateOrderState(e)
     }
     
        }
    }
</script>

<style lang="scss">
    .order-title {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 5px;
        border-bottom: 1px solid #EFEFEF;
        .order-title-text{
            font-size: 14px;
            margin-left: 10px;
        }
    }
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
        overflow: hidden;
        
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
