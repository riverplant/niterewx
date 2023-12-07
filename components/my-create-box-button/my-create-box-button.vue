<template>
    <view class="create-box-button-container" >
        <navigator class="panel-item" :url="'/subpkg/box_requestWarehouse_form/box_requestWarehouse_form'">
         <view class="btn-claim">新起一箱</view>
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
    .create-box-button-container {
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