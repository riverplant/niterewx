<template>
    <view class="my-container">
        <my-login v-if="!token"></my-login>
        <my-userinfo v-else></my-userinfo>





    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                orderList: [],
                ordersNonValide: [],
                ordersNonPayer: [],
                ordersNonLivrer: [],
                ordersRembourse: [],
            }
        },

        onShow() {
            if (this.token) {
                console.log('onShow......')
                this.initSwiperDate()
            }
        },
        computed: {
            ...mapState('m_user', ['token', 'openid'])
        },
        methods: {
            ...mapMutations('m_user', ['updateSwiperList']),
            ...mapMutations('m_order', ['setOrdersNonValide', 'setOrdersNonPayer', 'setOrdersNonLivrer',
                'setOrdersRembouse', 'updateOrderListByOpenId'
            ]),

            async initSwiperDate() {
                const {
                    data: result
                } = await uni.$http.get('https://www.uinav.com/api/public/v1/home/swiperdata')
                if (result.meta.status !== 200) return uni.$showMsg()
                console.log('swiperdata:', result.message)
                this.updateSwiperList(result.message)
                this.initOrders()
                // this.initOrderList()
            },
            async initOrders() {
                const {
                    data: res
                } = await uni.$http.get('http://127.0.0.1:8080/wx/orders/getAllOrderListByOpenId?openId=' + this.openid)
                console.log('res.status:', res.status)
                if (res.status !== 200) return uni.$showMsg()
                this.orderList = res.data
                this.updateOrderListByOpenId(res.data)
                this.initOrderList()

            },

            initOrderList() {
                console.log('ordrelist:', this.orderList)
                this.ordersNonValide = this.orderList.filter(x => x.orderStatus === 2)
                this.setOrdersNonValide(this.ordersNonValide)
                this.ordersNonPayer = this.orderList.filter(x => x.orderStatus === 1)
                console.log('ordersNonPayer:', this.ordersNonPayer)
                this.setOrdersNonPayer(this.ordersNonPayer)
                this.ordersNonLivrer = this.orderList.filter(x => x.payStatus === 20)
                this.setOrdersNonLivrer(this.ordersNonLivrer)
                this.ordersRembourse = this.orderList.filter(x => x.payStatus === 40)
                this.setOrdersRembouse(this.ordersRembourse)

            }
        }
    }
</script>

<style lang="scss">
    page,
    .my-container {
        height: 100%;
    }
</style>