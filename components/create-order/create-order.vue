<template>
    <view class="create-order-container">
        <view class="search-box">
              <uni-search-bar placeholder="输入包裹号/提货码查找" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />
			  
            </view>
            <!--订单标题区域-->
           <view class="create-order-title">
               <!--左侧得图标-->
                <uni-icons type="shop" size="18"></uni-icons>
               <!--右侧得文本-->
               <text class="create-order-title-text">所有包裹列表</text>
			            
           </view>
         <uni-swipe-action>
              <block v-for="(item,i) in items" :key='i'>
         <navigator class="panel-item-refuse" :url="'/subpkg/order_form/order_form?oinfo='+JSON.stringify(item)" v-if="item.orderStatus ===2"> 
         <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
              <order-item :order="item" :show-price="isShowPriceAndRadio" :show-radio="isShowPriceAndRadio" :show-msg="isShowMsg" @radio-change="radioChangeHandler"></order-item>
         </uni-swipe-action-item>
         </navigator>
		 
		 <navigator class="panel-item" :url="'/subpkg/order_form/order_form?oinfo='+JSON.stringify(item)" v-else>
		 <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
		      <order-item :order="item" :show-price="isShowPriceAndRadio" :show-radio="isShowPriceAndRadio" :show-msg="isShowMsg" @radio-change="radioChangeHandler" :isAdmin="isAdmin"></order-item>
		 </uni-swipe-action-item>
		 </navigator>
             </block>
         </uni-swipe-action>
         <!--自定义结算组件-->
  <my-create-button :title="'创建新订单'" :navigatorUrl="'/subpkg/order_form/order_form'"></my-create-button>
    </view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
		props: {
		    items: {
				type:Array,
				default:[]
			},
			itemsBak:{
				type:Array,
				default:[]
			}
			},
			
		
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
                type:1,
                title:'',
                isShowPriceAndRadio:false,
                isShowMsg:false,
                isShow:false,
				isAdmin:true,

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
		
		beforeMount() {
			const sysInfo =  uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getAllorderList()
			
		},
        filters: {
            tofixed(num) {
                return Number(num).toFixed(2)
            }
        },
        computed: {
            ...mapState('m_user', ['code']),
             ...mapState('m_order', ['ordersNonValide','ordersNonPayer','ordersNonLivrer','ordersRembourse', 'orderList'])
        },
		
        methods: {    
            ...mapMutations('m_order',['updateOrderState', 'updateOrderList','updateCatTree']),  
			async getAllorderList() {
				const {
					data: res
				} = await uni.$http.get('/wx/orders/getAllorderList')
				if (res.status != 200) return uni.$showMsg('查询订单列表失败!')
				this.updateOrderList(res.data)
				this.items = res.data
				this.itemsBak = res.data
			},
			swipeItemClickHandler(item) {
				uni.showModal({
				    title: '提示',
				    content: '确定要删除该包裹吗',
				    success: function (res) {
				        if (res.confirm) {
				           this.removeItemById(item.id)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }.bind(this)
				});
               
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
             this.items = this.itemsBak  
           }else {
             this.items = this.items.filter( item=> (item.orderNumber.indexOf( this.kw ) > -1 || item.code.indexOf( this.kw ) > -1 ) );   
           }
          
      
     },
	 
	async removeItemById(id) {
		 const {
		     data: orderRes
		 } = await uni.$http.delete('/wx/orders/'+ id)  
		  if (orderRes.status != 200) return uni.$showMsg('删除包裹信息失败!') 
		  
	this.items = this.itemsBak.filter(
	                           order=> order.id != id )
	this.itemsBak = this.items
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

.panel-item-refuse {
	background-color:rgba(201, 76, 76, 0.3) ;
}
</style>
