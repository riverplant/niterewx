<template>
    <view class="cabinet-item">
        <view class="cabinet-item-left">
            <radio :checked="order.state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"/>
           <image :src="defaultPic" class="cabinet-pic"></image> 
        </view>
        <view class="cabinet-item-right">
            <view class="cabinet-item-desc">
                 <view class="cabinet-item-desc-text1">柜子号码: {{cabinet.cabinetNumber}} </view>
                <view class="cabinet-item-desc-text2"> 合計重量：{{cabinet.weightTotal}} KG</view>
                <view class="cabinet-item-desc-text3"> 合計体积：{{cabinet.volumTotal}} m3</view>
				 <view class="cabinet-item-desc-text3"> 总包裹数：{{cabinet.orderCount}} </view>
				 <view class="cabinet-item-desc-text3"> 出海日期：{{cabinet.departureDate}}</view>
            </view>
            <view class="cabinet-item-info-box">
                <view v-if="showPrice" class="cabinet-item-price">
                    <view class="cabinet-item-sub-left">
						实际支付金额
					</view>
					<view class="cabinet-item-sub-right-price">
						 ${{order.price}}
					</view>
                </view>
                <view v-if="showMsg" class="cabinet-item-msg">
                    <view class="cabinet-item-sub-left">
						<image :src="defaultMsgPic" class="cabinet-item-sub-icon"></image>
					</view>
					<view class="cabinet-item-sub-right">
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
            cabinet: {
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
                   id: this.cabinet.id,
                   state: !this.cabinet.state
                })
            }
        }
    }
</script>

<style lang="scss">
.cabinet-item {
    width: 750rpx;
    box-sizing: border-box;
    //box-sizing: border-box;
    display: flex;
    padding: 10px 5 px;
    border-bottom: 3px solid#f0f0f0;
}
.cabinet-item-left {
	margin-top: 10rpx;
	margin-bottom: 10rpx;
	margin-left: 30rpx;
	margin-right: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	}
.cabinet-pic {
	width: 150rpx;
	height: 150rpx;
	display: block;
	}
.cabinet-item-right {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	}
	
.cabinet-item-sub-left{
	display: flex;
	justify-content: space-between;
	align-items: center;
	}
.cabinet-item-sub-right{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	}
.cabinet-item-sub-icon{
	margin-right: 10rpx;
	width: 30rpx;
	height: 30rpx;
	display: block;
	}
	
.cabinet-item-sub-right-price{
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
.cabinet-item-desc-text1 {
	margin-top: 20rpx;
	font-weight: 800;
	font-size: 30rpx;
	color: #000000;
	}
.cabinet-item-desc-text2 {
	font-size: 20rpx;
	color: #505050;
	}
.cabinet-item-desc-text3 {
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
.cabinet-item-msg{
	display: flex;
	width: 410rpx;
	margin-bottom: 20rpx;
	font-size: 25rpx;
	color: #fe642c;
	}
</style>