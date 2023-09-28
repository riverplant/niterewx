<template>
    <view class="my-container">
       <my-login v-if="!token"></my-login>
        <my-userinfo v-else></my-userinfo>
        




    </view>
</template>

<script>
    import {
        mapState, mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
       ordersNonValide: [],
       ordersNonPayer: [],
       ordersNonLivrer: [],
       ordersRembourse: [],
            }
        },
     
        onShow() { 
             if(this.token) {
                console.log('onShow......') 
                this.initSwiperDate()
             }        
        },
        computed: {
            ...mapState('m_user', ['token'])
        },
        methods: {
            ...mapMutations('m_user',['updateSwiperList']),
            ...mapMutations('m_order',['setOrdersNonValide','setOrdersNonPayer','setOrdersNonLivrer','setOrdersRembouse']),
            
            async  initSwiperDate() {
               const { data:result } =  await uni.$http.get('https://www.uinav.com/api/public/v1/home/swiperdata')
                if( result.meta.status !== 200 ) return uni.$showMsg()  
                console.log('swiperdata:',result.message)
               this.updateSwiperList(result.message)  
               // this.initOrders()
                this.initOrderList()
            },  
            // async  initOrders() {
            //     const {data:res} = await  uni.$http.get('https://13bc-184-162-136-202.ngrok.io/wx/orders/getAllOrderList')   
            //    console.log('res.status:',res.status)
            //     if( res.status !== 200 ) return uni.$showMsg()
            //     console.log('initOrders:',res.data)
              
            //   this.initOrderList(res)  
             
            //   },
              
              initOrderList() {
                  // for (let i = 0; i < res.data.length; i++) {
                  // 	if (res.data[i].orderStatus === 2) {
                  // 		this.ordersNonValide.push(res.data[i])
                  // 	}else if(res.data[i].payStatus === 10) {
                  //         this.ordersNonPayer.push(res.data[i])
                  //     }else if(res.data[i].payStatus === 20 ) {
                  //         this.ordersNonLivrer.push(res.data[i])
                  //     }else {
                  //         this.ordersRembourse.push(res.data[i])
                  //     }
                  // }
                 // this.setOrdersNonValide(this.ordersNonValide)
                 
                 this.ordersNonPayer = [
                  {"id":"001","catName":"一般商品","trackingNumber":"000000001","price": 51, "pLong":"22.02", "pWidth":"15.02",
                  "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
                  {"id":"002","catName":"一般商品","trackingNumber":"000000002","price": 55.23, "pLong":"22.02", "pWidth":"15.02",
                  "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": false},
                  {"id":"003","catName":"一般商品","trackingNumber":"000000003","price": 50.25, "pLong":"22.02", "pWidth":"15.02",
                  "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
                  {"id":"004","catName":"一般商品","trackingNumber":"000000004","price": 43.25, "pLong":"22.02", "pWidth":"15.02",
                  "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true}, 
                  {"id":"005","catName":"一般商品","trackingNumber":"000000005","price": 40.25, "pLong":"22.02", "pWidth":"15.02",
                  "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
                  {"id":"006","catName":"一般商品","trackingNumber":"000000006","price": 60.00, "pLong":"22.02", "pWidth":"15.02",
                  "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true}
                   ]
                   
                   this.ordersNonValide = [ 
                       {"id":"007","catName":"一般商品","trackingNumber":"000000001","msg": "没有提货码", "pLong":"22.02", "pWidth":"15.02",
                  "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": true},
                  {"id":"008","catName":"一般商品","trackingNumber":"000000002","msg": "商品类型与实际商品不符", "pLong":"22.02", "pWidth":"15.02",
                  "pHeight":"12.0", "pWeight":"0.66", "pWeightByVolume":"1.96", "state": false}
                  ]
                  this.setOrdersNonPayer( this.ordersNonPayer )
                  this.setOrdersNonValide( this.ordersNonValide )
                  // this.setOrdersNonLivrer(this.ordersNonLivrer)
                  // this.setOrdersRembouse(this.ordersRembourse)
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