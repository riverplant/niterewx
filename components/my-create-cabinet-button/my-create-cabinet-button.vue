<template>
    <view class="create-cabinet-button-container" >
        <navigator class="panel-item" :url="'/subpkg/box_requestWarehouse_form/box_requestWarehouse_form'">
         <view class="btn-claim">新創建一個櫃子</view>
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
    .create-cabinet-button-container {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding-left: 5px;

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