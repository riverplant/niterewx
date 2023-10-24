<template>
    <view class="claim-container">
        <view class="search-box">
              <uni-search-bar placeholder="输入快递号查找" bgColor=" #FFFFFF" @input="search" cancel-button="none" :radius="100" />  
            </view>
            <!--订单标题区域-->
           <view class="claim-title">
               <!--左侧得图标-->
                <uni-icons type="shop" size="18"></uni-icons>
               <!--右侧得文本-->
               <text class="claim-title-text">認領申请</text>
           </view>
         <uni-swipe-action>
              <block v-for="(item,i) in searchResults" :key='i'>
             <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
                  <claim-item :claim="item"  :show-msg="isShowMsg" ></claim-item>
             </uni-swipe-action-item>
             </block>
         </uni-swipe-action>
         <!--自定义结算组件-->
         <my-claim-button></my-claim-button> 
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
                isShowMsg:false,
                isShow:false,
                isloading:true,
				updateClaimList:[]
            };
        },
        computed: {
            ...mapState('m_user', ['code','openid']),
			...mapState('m_order', ['code','claimList'])
			
        },

		onShow() {
		    console.log('onshow...getClaimeList...')
			this.getClaimeList()
			const sysInfo =  uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			
		},
        methods: {    		
            swipeItemClickHandler(item) {
                console.log(item)
                this.removeItemById(item.id)
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
             this.searchResults = this.searchResults.filter( item=> item.trackingNumber.indexOf( this.kw ) > -1 );   
           }
                   
     },
     gotoDetail(item) {
         uni.navigateTo({
             url: '/subpkg/orders_detail/orders_detail?item=' + JSON.stringify(item)
         })
     },
	 async getClaimeList() {
	 	const {
	 	    data: res
	 	} = await uni.$http.get('http://127.0.0.1:8080/wx/users/claimList')
	 	if (res.status !== 200) return uni.$showMsg()
		this.updateClaimList = res.data
		this.searchResults = this.updateClaimList.filter(claim=>claim.openid == this.openid)
		this.searchResultsBak = this.searchResults
	 },
     radioChangeHandler(e) {
         this.updateOrderState(e)
     }
     
        }
    }
</script>

<style lang="scss">
    .claim-container {
        padding-bottom: 50px;
    }
    .claim-title {
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 5px;
        border-bottom: 1px solid #EFEFEF;
        .claim-title-text{
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
