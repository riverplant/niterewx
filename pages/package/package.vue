<template>
    <view>
      <create-order></create-order>
    </view>
</template>

<script>
    import {
        mapState, mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
                
            };
        },
        
        onShow() {
            this.initCatTree()
        },
        methods: {
         ...mapMutations('m_order',['updateCatTree']),
         async initCatTree() {
             const {data: res} = await uni.$http.get('http://127.0.0.1:8080/wx/orders/catlist')
             if (res.status != 200) return uni.$showMsg('查詢提貨點列表失败!')
              console.log('res:', res.data)
              this.updateCatTree(res.data)
         }   
        }
       
    }
</script>

<style lang="scss">

</style>
