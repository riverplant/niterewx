<template>
    <view class="my-claim-button-container" >
		<view v-if="!code">
        <view class="btn-claim" @click="declaration">发起申请</view>
		</view>
		
		<view v-else>
		 <navigator :url="'/subpkg/claim_form/claim_form'">
		  <view class="btn-claim" @click="requestClaim">发起申请</view>
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
            ...mapState('m_order', ['ordersNonPayer']),
            ...mapGetters('m_order', ['checkedCount', 'count', 'total']),
            isFullCheck() {
                return this.count === this.checkedCount
            }
        },
        methods: {
            ...mapMutations('m_order', ['updateAllOrdersState', 'setOrdersNonPayer']),

            changeAllState() {
                this.updateAllOrdersState(!this.isFullCheck)
            },

            requestClaim() {
               
            },
			
			declaration() {
				uni.showToast({
				  title: "该功能需要您先申请提货码!!!",
				  duration: 2000,
				  icon: 'none'
				}) 
			}
        }
    }
</script>

<style lang="scss">
    .my-claim-button-container {
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
        padding-left: 0px;

        .btn-claim {
			width:750rpx;
            background-color: #00aa00;
            height: 50px;
            color: white;
            line-height: 50px;
            padding: 0 10px;
            min-width: 100px;
            text-align: center;
        }
    }

</style>