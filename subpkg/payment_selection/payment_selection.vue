<template>
	<view>
		<view class="panel-list">
			<view class="panel">
				
					<text class="sub-item-title">需要支付的金额</text>
					<text class="sub-item-text1">${{total}}</text>
					<text class="sub-item-title">选择支付方式</text>
					<image src="/static/payment-wechat.png" class="payment-image" @click="payOrder"></image>
					<!-- <navigator :url="'/subpkg/payment_selection/payment_etransfer'">
						<image src="/static/payment-etransfer.png" class="payment-image"></image>
					</navigator> -->
					<view class="empty_block"></view>
				
			</view>

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
		data() {
			return {
             id:''
			}
		},
        
        computed: {
            ...mapState('m_user', [ 'userinfo']),
            ...mapState('m_order', ['ordersNonPayer']),
            ...mapGetters('m_order', ['checkedCount', 'count', 'total']),
        },
        
		methods: {
  // 點擊微信支付，調用支付接口
            async payOrder() { 
                try {
                    const orderInfo = {
                        price: this.total,
                        code: this.userinfo.code,
                        openId: this.userinfo.openid,
                        userId: this.userinfo.id,
                        payMethod: this.radio1,
						pid: this.userinfo.pid,
                        payStatus: 10,
                        preOrderItems: this.ordersNonPayer.filter(x => x.state).map(x => x)
                    }

                    const {
                        data: res
                    } = await uni.$http.post('/wx/orders/create', orderInfo)
                    if (res.status != 200) return uni.$showMsg('创建订单失败!')
                    const oNumber = res.data
                    this.id = res.data
                    const param = {
                        orderNumber: oNumber
                    }
                    //調用統一下單已支付
                    const {
                        data: preparePayRes
                    } = await uni.$http.post('/wx/orders/unifiedorder', param)
                    if (res.status != 200) return uni.$showMsg('獲取預订单號失败!')
                    console.log('res.data:', preparePayRes)

                    if (preparePayRes.return_code === 'FAIL')
                        return uni.$showMsg(preparePayRes.return_msg)

                    const payInfo = preparePayRes.data
                    console.log('payInfo:',payInfo)
                    // 發起請求
                    let payRes = await this.requestPay(payInfo)
                    //刪除緩存中已經支付的商品
                    this.setOrdersNonPayer(this.ordersNonPayer.filter(x => !x.state))
                    uni.showToast({
                        title: '訂單支付完成!',
                        icon: 'success'
                    })
                 uni.navigateBack({
                     delta: 2
                 }); 
                } catch (e) {
                    uni.showToast({
                        title: '訂單支付失敗，請稍後重試!',
                        icon: 'none'
                    })
                }


            },

            async requestPay(pay) {
				console.log('pay:',pay)
                return new Promise((resolve, reject) => {
                    wx.requestPayment({
                        ...pay,
                        success: (res) => {
                            resolve(res)
                        },
                        fail: (err) => {
							console.log('取消支付')
                            this.deletePayOrder(this.id)
                            reject(err)
                        }
                    })
                })
				
            },
            
            async deletePayOrder(id) {
                const {
                    data: res
                } = await uni.$http.delete('/wx/orders/payorder/'+id)
                if (res.status != 200) return uni.$showMsg('创建订单失败!')
            }
 		}
	}
</script>

<style lang="scss">
	.empty_block {
		height: 200rpx;
	}
	.payment-image {
		padding-left: 150rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 400rpx;
		height: 177rpx;
	}

	.btn-text {
		margin-top: 50rpx;
		width: 750rpx;
		background-color: #00aa00;
		height: 50px;
		color: white;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}

	.panel-list {
		padding: 0 10px;
		position: relative;
		top: 10rpx;
		align-items: center;
	
		.panel {
			position: sticky;
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			align-items: center;
			width: 100%;
			}
	}
	
	.sub-item-title {
		padding-top: 100rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		font-size: 20rpx;
		color: #aaaaaa
	}

	.sub-item-text1 {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 30rpx;
		font-weight: 800;
		text-align: center;
		color: #00aa00
	}

	.panel-list2 {
		padding: 0 10px;
		position: relative;
		top: 5px;
		height: 400rpx;

		.panel2 {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			height: 400rpx;


		}
	}

	.panel-text {
		margin-top: 10rpx;
		font-size: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding-bottom: 20rpx;
	}

	.panel-title {
		padding-top: 20rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
		color: #aaaaaa;
		border-bottom: 1px solid #F4F4F4;
	}

	.panel-title2 {
		padding-top: 180rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 300rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
		color: #aaaaaa;
	}
</style>