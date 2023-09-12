<template>
    <view>
        <view class="search-box">
              <uni-search-bar placeholder="输入订单号查找订单" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />  
            </view>
            <!--搜索历史 -->
        <!--    <view class="history-box" v-if="">
                <view class="history-title">
                    <text>搜索历史</text>
                <uni-icons type="trash" size="17"></uni-icons> 
                </view>
                <view class="history-list">
                    <uni-tag :text=item v-for="(item,i) in historyList" :key="i"></uni-tag>
                </view>
            </view> -->
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
                type:0,

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
            ...mapState('m_user', ['code']) 
        },
        onLoad(e) {
             this.type = e.type;
             if(this.type === 1) {
               this.queryObj.orderStatus = 2
             }else {
                 if(this.type === 2) {
                     this.queryObj.payStatus = 10
                 }else if(this.type === 3) {
                     this.queryObj.payStatus = 20
                 }else if(this.type === 4){
                   this.queryObj.payStatus = 30  
                 }else {
                    this.queryObj.payStatus = 40   
                 }
             } 
             
             const sysInfo =  uni.getSystemInfoSync()
            this.wh = sysInfo.windowHeight - 50
            this.getSearchResults(  this.orderStatus, this.payStatus ) 
        },
        methods: {       
            search(res) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.kw = res,
                   this.getSearchResults(  this.orderStatus, this.payStatus ) 
                }, 500)
             },  
    async getSearchResults(orderStatus, payStatus, cb) {  
        this.isloading = true
         this.queryObj.code = this.code
          this.queryObj.id = this.kw
        //   if(this.code !== '')  {
              const {data:res} = await  uni.$http.get('http://127.0.0.1:8080/wx/orders/list', this.queryObj)
              this.isloading = false
              
              //调用回调函数
              cb && cb()
              
              if( res.status !== 200 ) return uni.$showMsg()
              this.searchResults = [...this.searchResults, ...res.data.list ]  
              this.total = res.data.page.total 
  /**         }
         
        else 
        {
          this.searchResults = [
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
              {"id":"006","catName":"一般商品","trackingNumber":"000000006","price": "60.00$"},
              ]  
        }  
        **/
                   
     },
     gotoDetail(item) {
         console.log(item)
         uni.navigateTo({
             url: '/subpkg/orders_detail/orders_detail?item=' + JSON.stringify(item)
         })
     }
        },
        
        onReachBottom() {
            if(this.queryObj.pageNum * this.queryObj.pageSize >= this.total) return uni.$showMsg("数据加载完毕!")
          if(this.isloading) return
          //让页码值增加1  
          this.queryObj.pageNum +=1
          
           this.getSearchResults(  this.orderStatus, this.payStatus, ()=>uni.stopPullDownRefresh() )  
        },
        
        onPullDownRefresh() {
            this.queryObj.pageNum = 1
            this.total = 0
            this.isloading = false
            this.searchResults = []
            
            this.getSearchResults(orderStatus, payStatus)
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

.history-box {
    padding: 0 5px;
   .history-title {
       display: flex;
       justify-content: space-between;
       height: 40px;
       align-items: center;
       font-size: 13px;
       border-bottom: 1px solid #efefef;
   } 
   .history-list {
       display: flex;
       flex-wrap: wrap;
   }
   .uni-tag {
       margin-top: 2px;
       margin-right: 5px;
   }
}
</style>
