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
		 <view class="order-item-msg">
		 	<view class="order-item-sub-left">
		 		<image src="/static/note_icon.png" class="order-item-sub-icon"></image>
		 	</view>
		 	<view class="order-item-sub-right">
		 		<text>当您的物流信息表明您的包裹已经在逆海淘国内仓库签收，但是在您的包裹列表页面迟迟不见其显示。 您可以发起包裹认领/查找请求。</text>
		 	</view>
		 </view>

         <!--自定义结算组件-->
         <my-claim-button></my-claim-button> 
    </view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
		props: {
		    claims: {
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
				searchResults:[],
                searchResultsBak:[],
                type:1,
                title:'',
                isShowMsg:false,
                isShow:false,
                isloading:true
            };
        },
        computed: {
            ...mapState('m_user', ['userinfo']),
			...mapState('m_order', ['claimList'])
			
        },

		beforeMount() {
			const sysInfo =  uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getClaimeListByOenId()
		},
        methods: {
		   	async getClaimeListByOenId() {
				const {
					data: res
				} = await uni.$http.get('/wx/users/claimList/'+this.userinfo.openid)
				if (res.status !== 200) return uni.$showMsg()
				this.searchResults = res.data
				this.searchResultsBak = res.data
			},
            swipeItemClickHandler(item) {
                this.removeItemById(item.trackingNumber)
            },
			
			removeItemById(trackingNumber) {
				uni.showModal({
				    title: '提示',
				    content: '确定要删除该申请吗',
				    success: function (res) {
				        if (res.confirm) {
				           this.deleteItemById(trackingNumber)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }.bind(this)
				});

			},
			
			async deleteItemById(trackingNumber) {
				const {
				    data: res
				} = await uni.$http.delete('/wx/users/deleteClaim/'+ trackingNumber)
				if (res.status !== 200) return uni.$showMsg()
				this.searchResults = this.searchResultsBak.filter(
				                           claim=> claim.openid == this.userinfo.openid 
										   && claim.trackingNumber != trackingNumber 
										   && claim.isDelete == 1)
				this.searchResultsBak = this.searchResults
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
.order-item-msg{
		display: flex;
		width: 660rpx;
		margin: 20rpx;
		font-size: 25rpx;
		color: #fe642c;
		}
	.order-item-sub-left{
		display: flex;
		justify-content: space-between;
		align-items: center;
		}
	.order-item-sub-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		}
		.order-item-sub-icon{
			margin-right: 10rpx;
			width: 30rpx;
			height: 30rpx;
			display: block;
			}
</style>
