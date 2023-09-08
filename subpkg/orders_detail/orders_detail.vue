<template>
    <view>
       
    </view>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                wh:0,
                active:0,
                scrollTop:0.,
                timer: null,
                kw: '',
                searchResults:[],
                historyList:['a','app','apple'],
                orderStatus:'',
                payStatus:'',

            };
        },
        computed: {
            ...mapState('m_user', ['code']) 
        },
        onLoad(e) {
             this.orderStatus = e.orderStatus
             this.payStatus = e.payStatus
             const sysInfo =  uni.getSystemInfoSync()
            this.wh = sysInfo.windowHeight - 50
            this.getSearchResults(  this.orderStatus, this.payStatus ) 
        },
        methods: {       
  
        }
    }
</script>

<style lang="scss">
   


</style>
