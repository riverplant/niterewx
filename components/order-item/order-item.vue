<template>
    <view class="order-item">
        <view class="order-item-left">
            <radio :checked="order.state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"/>
           <image :src="defaultPic" class="order-pic"></image> 
        </view>
        <view class="order-item-right">
            <view class="order-item-desc">
                 <view class="order-item-desc-text">  包裹号码: {{order.id}} </view>
                <view class="order-item-desc-text"> 长: {{order.pLong}} | 宽: {{order.pWidth}} | 高: {{order.pHeight}} CM</view>
                <view class="order-item-desc-text">  体积重{{order.pWeightByVolume}} KG </view>
                <view class="order-item-desc-text">  实际重{{order.pWeight}} KG </view>
            </view>
            <view class="order-item-info-box">
                <view v-if="showPrice" class="order-item-price">
                    实际支付金额: ${{order.price}}
                </view>
                <view v-if="showMsg" class="order-item-price">
                    信息: {{order.msg}}
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
               defaultPic:'/static/package.jpg'
            };
        },
        methods: {
            radioChangeHandler() {
                console.log(this.order.id)
                console.log(this.order.state)
                

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
    
    .order-item-left {
        margin-right: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .order-pic {
            width: 80px;
            height: 80px;
            display: block;
        }
        .order-item-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .order-item-desc {
               display: flex;
               flex-direction: column;
               justify-content: space-between; 
               .order-item-desc-text {
                   font-size: 14px;
                   color: #C00000;
               }
            }
        }
        
        
    }
}
</style>