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
               this.initOrders()
            },
            async  initOrders() {
                const {data:res} = await  uni.$http.get('http://127.0.0.1:8080/wx/orders/getAllOrderList')  
               console.log('res.status:',res.status)
                if( res.status !== 200 ) return uni.$showMsg()
                console.log('initOrders:',res.data)
              
              this.initOrderList(res)  
            
              },
              
              initOrderList(res) {
                  for (let i = 0; i < res.data.length; i++) {
                  	if (res.data[i].orderStatus === 2) {
                  		this.ordersNonValide.push(res.data[i])
                  	}else if(res.data[i].payStatus === 10) {
                          this.ordersNonPayer.push(res.data[i])
                      }else if(res.data[i].payStatus === 20 ) {
                          this.ordersNonLivrer.push(res.data[i])
                      }else {
                          this.ordersRembourse.push(res.data[i])
                      }
                  }
                  this.setOrdersNonValide(this.ordersNonValide)
                  this.setOrdersNonPayer(this.ordersNonPayer)
                  this.setOrdersNonLivrer(this.ordersNonLivrer)
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