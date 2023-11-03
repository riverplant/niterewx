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
               <text class="claim-title-text">認領申请管理</text>
           </view>
         <uni-swipe-action>
            <block v-for="(item,i) in claims" :key='i'>
            <navigator class="panel-item" :url="'/subpkg/claim_table/claim_table?claim='+JSON.stringify(item)"> 
                  <claim-item :claim="item" ></claim-item>
            </navigator>
             </block> 

         </uni-swipe-action>
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
                searchResultsBak:[],
                type:1,
                title:'',
                isloading:true
            };
        },
        computed: {
            ...mapState('m_user', ['openid'])
			
        },

		beforeMount() {
			const sysInfo =  uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.searchResultsBak = this.claims
			
		},
        methods: {    			
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
             this.claims = this.searchResultsBak  
           }else {
             this.claims = this.claims.filter( item=> item.trackingNumber.indexOf( this.kw ) > -1 );   
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
