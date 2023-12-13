<template>
    <view class="my-settle-container" v-if="show">
        <!-- 全选 -->
        <label class="radio">
            <radio color="#C00000" :checked="isFullCheck" @click="changeAllState" /><text>全选</text>
        </label>
        <!-- 合计 -->
        <view class="count-box">
            订单总数: <text class="count">{{count}}</text>
        </view>

       

        <!--  结算 -->
        <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
		
<!--  修改 -------->
        <uni-popup ref="popup" :mask-click="false">
			
            <uni-section title="请选择支付方式" type="line">
				<view class="uni-px-5 uni-pb-5">
				    订单总价: <text class="total">${{total}}</text>
				</view>
				
                <view class="uni-px-5 uni-pb-5 ">
					<uni-data-checkbox mode="button" v-model="radio1" :localdata="payMethods"></uni-data-checkbox>
                </view>
            </uni-section>
            <block v-if="radio1 === 2">
                <image src="../../static/c1.png"></image>
            </block>
            <button @click="close">关闭</button>
        </uni-popup>
		
<!--  修改 -------->		
		
		
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
                radio1: 0,
                payMethods: [{
                    text: '微信支付',
                    value: 1
                }, {
                    text: 'Interac',
                    value: 2
                }]
            };
        },
        computed: {
            ...mapState('m_user', [ 'userinfo']),
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


            settlement() {
				
				//++++++++++ 跳轉到另外一個頁面
				
              /**  if (!this.checkedCount) return uni.$showMsg('请至少选择一个未支付的订单')
                if (this.radio1 !== 1) {
                    this.$refs.popup.open('center')
                } else {
                    this.payOrder()
                } **/
            },
			
			
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
                            reject(err)
                        }
                    })
                })
				
            },
			
			
            close() {
                this.$refs.popup.close()
            }
        }
    }
</script>

<style lang="scss">
    .my-settle-container {
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

        .radio {
            display: flex;
            align-items: center;
        }

        .count-box {
            .count {
                color: #C00000;
                font-weight: bold;
            }
        }

        .btn-settle {
            background-color: #C00000;
            height: 50px;
            color: white;
            line-height: 50px;
            padding: 0 56px;
            min-width: 100px;
            text-align: center;
        }
    }
</style>