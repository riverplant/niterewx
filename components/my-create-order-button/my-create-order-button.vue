<template>
    <view class="create-order-button-container" >
        <navigator class="panel-item" :url="'/subpkg/order_form/order_form'">
         <view class="btn-claim">创建新订单</view>
        </navigator>
        </view> 
    </view>
</template>

<script>
    export default {
        data() {
            return {
            };
        }
    }
</script>

<style lang="scss">    

    .create-order-button-container {
        position: fixed;
        bottom: 85px;
        width: 100%;
        height: 100rpx;
        background-color: white;



        .btn-claim {
            background-color: #C00000;
            height: 100rpx;
            color: white;
            line-height: 100rpx;
            padding: 0 100rpx;
            min-width: 100rpx;
            text-align: center;
        }
    }
</style>