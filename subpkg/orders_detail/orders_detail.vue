<template>
    <view>
       
    </view>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
            item:{}
            };
        },
        computed: {
            ...mapState('m_order', ['orders'])
        },
     
        onLoad(e) {
           this.item = JSON.parse(e.item)
           console.log("item:",this.item)
        },
        methods: {       
  
        }
    }
</script>

<style lang="scss">
   


</style>
