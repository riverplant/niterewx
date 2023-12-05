<template>
    <view class="create-order-button-container" >
        <navigator class="panel-item" :url="'/subpkg/order_form/order_form'">
         <view class="btn-claim">創建新的訂單</view>
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
        bottom: 52px;
        width: 100%;
        height: 50px;
        background-color: white;



        .btn-claim {
            background-color: #C00000;
            height: 50px;
            color: white;
            line-height: 50px;
            padding: 0 10px;
            min-width: 100px;
            text-align: center;
        }
    }
</style>