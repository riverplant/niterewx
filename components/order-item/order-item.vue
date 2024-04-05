<template>
    <view class="order-item">
        <view class="order-item-left">
            <radio :checked="order.state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"/>
           <image :src="defaultPic" class="order-pic"></image> 
        </view>
        <view class="order-item-right">
            <view class="order-item-desc">
                 <view class="order-item-desc-text1"><text class="l1">{{order.code}}</text>     <text class="l1">{{order.orderNumber}}</text>             <text class="l1">{{order.pName}}</text> </view>
				  <view class="order-item-desc-text11">单号: {{order.trackingNumber}} </view>
                <view class="order-item-desc-text2"> 尺寸：{{order.pLong}} × {{order.pWidth}} × {{order.pHeight}} CM   |   重量:{{order.pWeight}} KG</view>
				 <view class="order-item-desc-text2" v-if="order.orderStatus === 2"> 审核状态：未通过   |  原因: {{order.msg}} </view>
				
            </view>
            <view class="order-item-info-box">
                <view v-if="showPrice" class="order-item-price">
                    <view class="order-item-sub-left">
						实际支付金额
					</view>
					<view class="order-item-sub-right-price">
						 ${{order.price}}
					</view>
                </view>
                <view v-if="showMsg" class="order-item-msg">
                    <view class="order-item-sub-left">
						<image :src="defaultMsgPic" class="order-item-sub-icon"></image>
					</view>
					<view class="order-item-sub-right">
						{{order.msg}}
					</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            order: {
                type:Object,
                default:{}   
            },
            showPrice: {
                type: Boolean,
                default: false,
            },
            showMsg: {
                type: Boolean,
                default: false,
            },
            showRadio: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
               defaultPic:'/static/package.png',
			   defaultMsgPic:'/static/note_icon.png',
            };
        },
        methods: {
            radioChangeHandler() {
                this.$emit('radio-change', {
                   id: this.order.id,
                   state: !this.order.state
                })
            }
        }
    }
</script>

<style lang="scss">
.order-item {
    width: 750rpx;
    box-sizing: border-box;
    //box-sizing: border-box;
    display: flex;
    padding: 10px 5 px;
    border-bottom: 3px solid#f0f0f0;
}
.order-item-left {
	margin-top: 10rpx;
	margin-bottom: 10rpx;
	margin-left: 55rpx;
	margin-right: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	}
.order-pic {
	width: 120rpx;
	height: 120rpx;
	display: block;
	}
.order-item-right {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
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
	display: flex;
	justify-content: space-between;
	}
.order-item-desc-text11 {
		font-size: 28rpx;
		color: #000000;
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