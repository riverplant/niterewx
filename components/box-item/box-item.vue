<template>
    <view class="box-item">
        <view class="box-item-left">
            <radio :checked="order.state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"/>
           <image :src="defaultPic" class="order-pic"></image> 
        </view>
        <view class="box-item-center">
            <view class="box-item-desc">
                 <view class="box-item-desc-text1">箱子号码: {{box.boxNumber}} </view>
                <view class="box-item-desc-text2">包裹数：{{box.orderCount}} </view>
                <view class="box-item-desc-text3"> 合计重量：{{box.weightTotal}} KG </view>
				 <view class="box-item-desc-text3" v-if="box.boxStatus == 1"> 状态：未封箱</view>
				  <view class="box-item-desc-text3" v-else> 状态：已封箱</view>
				  <view class="box-item-desc-text3" v-if="box.boxType == 1"> 箱子类型：独立箱</view>
				   <view class="box-item-desc-text3" v-else> 箱子类型：合装箱</view>
            </view>

        </view>
		
	<!--	<view class="box-item-right">
			<view class="box-item-btn">
			    <view  class="box-item-price">
					<view class="order-item-sub-right-price">
						<view class="button-group">
							<button type="primary" size="mini" @click="closeAndPrint(box.boxNumber)">打标封箱</button>
						</view>
					</view>
			    </view>
			        
			</view>
		</view> -->
    </view>
</template>

<script>
    export default {
        props: {
            box: {
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
.box-item {
    width: 750rpx;
    box-sizing: border-box;
    //box-sizing: border-box;
    display: flex;
    padding: 10px 5 px;
    border-bottom: 3px solid#f0f0f0;
}
.box-item-left {
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
.box-item-center {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	}
/**.box-item-right {
	margin-top: 10rpx;
	margin-bottom: 10rpx;
	margin-left: 30rpx;
	margin-right: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}**/
	
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
.box-item-desc {
	display: flex;
	//width: 94px;
	flex-direction: column;
	justify-content: space-between; 
	}
.box-item-desc-text1 {
	margin-top: 20rpx;
	font-weight: 800;
	font-size: 30rpx;
	color: #000000;
	}
.box-item-desc-text2 {
	font-size: 20rpx;
	color: #505050;
	}
.box-item-desc-text3 {
	font-size: 20rpx;
	color: #505050;
	}
	
.box-item-price{
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