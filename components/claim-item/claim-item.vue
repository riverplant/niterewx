<template>
    <view class="claim-item">
        <view class="claim-item-left">
           <image :src="defaultPic" class="order-pic"></image> 
        </view>
        <view class="claim-item-right">
            <view class="order-item-desc">
                 <view class="order-item-desc-text1">快递单号: {{claim.trackingNumber}} </view>
				 
				  <view class="order-item-desc-text1">最近更新时间: {{claim.updateTime}} </view>
            </view>
            <view class="order-item-info-box">
                <view  class="order-item-price">
                    <view class="order-item-sub-left">
						当前申请状态
					</view>
					<block v-if="claim.status == 1">
					<view class="order-item-sub-right-price" >
						 处理中...
					</view>	
					</block>
					
					<block v-else-if="claim.status == 2">
					<view class="order-item-sub-right-price" >
						 认领成功
					</view>
					</block>
					<block  v-else>
						<view class="order-item-sub-right-price" >
							 认领失敗: {{claim.msg}}
						</view>
						</block>
					
					
                </view>

            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            claim: {
                type:Object,
                default:{}   
            }
        },
        data() {
            return {
               defaultPic:'/static/package.png',
			   defaultMsgPic:'/static/note_icon.png',
            };
        }
    }
</script>

<style lang="scss">
.claim-item {
    width: 750rpx;
    box-sizing: border-box;
    //box-sizing: border-box;
    display: flex;
    padding: 10px 5 px;
    border-bottom: 3px solid#f0f0f0;
}
.claim-item-left {
	margin-top: 10rpx;
	margin-bottom: 10rpx;
	margin-left: 30rpx;
	margin-right: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	}
.order-pic {
	width: 150rpx;
	height: 150rpx;
	display: block;
	}
.claim-item-right {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
	
.order-item-sub-right-price{
	width: 320rpx;
	font-weight: 800;
	text-align: right;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: #00a000;
	}
.order-item-desc {
	display: flex;
	flex-direction: column;
	justify-content: space-between; 
	}
.order-item-desc-text1 {
	margin-top: 20rpx;
	font-weight: 800;
	font-size: 30rpx;
	color: #000000;
	}

.order-item-photos {
		display: flex;
		flex-direction: row;
		justify-content: space-between; 
	}
.order-item-desc-text2 {
	font-size: 20rpx;
	color: #505050;
	}
.order-item-desc-text3 {
	font-size: 20rpx;
	color: #505050;
	}
	
.order-item-price{
	display: flex;
	width: 510rpx;
	margin-bottom: 20rpx;
	font-size: 25rpx;
	color: #000000;
	}
.order-item-msg{
	display: flex;
	width: 410rpx;
	margin-bottom: 20rpx;
	font-size: 25rpx;
	color: #fe642c;
	}
</style>