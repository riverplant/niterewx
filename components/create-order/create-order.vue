<template>
    <view class="create-order-container">
        <view class="search-box">
              <uni-search-bar placeholder="输入订单号查找订单" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />  
            </view>
            <!--订单标题区域-->
           <view class="create-order-title">
               <!--左侧得图标-->
                <uni-icons type="shop" size="18"></uni-icons>
               <!--右侧得文本-->
               <text class="create-order-title-text">包裹</text>
           </view>
         <uni-swipe-action>
              <block v-for="(item,i) in searchResults" :key='i'>
         <navigator class="panel-item" :url="'/subpkg/order_form/order_form?oinfo='+JSON.stringify(item)"> 
         <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
              <order-item :order="item" :show-price="isShowPriceAndRadio" :show-radio="isShowPriceAndRadio" :show-msg="isShowMsg" @radio-change="radioChangeHandler"></order-item>
         </uni-swipe-action-item>
         </navigator>
             </block>
         </uni-swipe-action>
         <!--自定义结算组件-->
         <my-create-order-button></my-create-order-button> 
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
                isShowMsg:false,
                isShow:false,

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
             ...mapState('m_order', ['ordersNonValide','ordersNonPayer','ordersNonLivrer','ordersRembourse', 'orderListWithoutBoxId'])
        },
        onLoad() {
            const sysInfo =  uni.getSystemInfoSync()
            this.wh = sysInfo.windowHeight - 50
            this.searchResults = this.orderListWithoutBoxId
            this.searchResultsBak = this.searchResults
        },
        methods: {    
            ...mapMutations('m_order',['updateOrderState', 'removeItemById']),
            swipeItemClickHandler(item) {
                console.log(item)
                //this.removeItemById(item.id)
            },
            search(res) {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.kw = res,
                   this.getSearchResults() 
                }, 500)
             },  
   
        getSearchResults() {  
        this.isloading = true
           if(this.kw === '') {
             this.searchResults = this.searchResultsBak  
           }else {
             this.searchResults = this.searchResults.filter( item=> item.id.indexOf( this.kw ) > -1 );   
           }
          
      
     },

     radioChangeHandler(e) {
         this.updateOrderState(e)
     }
     
        }
    }
</script>

<style lang="scss">
    .create-order-container {
        padding-bottom: 50px;
    }
    .create-order-title {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 5px;
        border-bottom: 1px solid #EFEFEF;
        .create-order-title-text{
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
