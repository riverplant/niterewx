<template>
    <view class="create-order-container" >
        <navigator class="panel-item" :url="'/subpkg/order_form/order_form'">
         <view class="btn-claim">創建新的訂單</view>
        </navigator>
        </view> 
    </view>
</template>

<script>
    import {
        mapGetters,
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        props: {
            show: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapState('m_user', ['code', 'openid', 'userinfo']),
            ...mapGetters('m_order', ['checkedCount', 'count', 'total']),
            isFullCheck() {
                return this.count === this.checkedCount
            }
        },
        methods: {
            ...mapMutations('m_order', ['updateAllOrdersState', 'setOrdersNonPayer']),
        }
    }
</script>

<style lang="scss">
    .create-order-container {
        position: fixed;
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