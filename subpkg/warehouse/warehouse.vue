<template>
    <view>
          <my-warehouse></my-warehouse>
    </view>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'
    export default {
        data() {
            return {
                
            };
        },
        onShow() {
            this.initDataTree()
        },
        methods: {
             ...mapMutations('m_user',['updatePickPointList']),
            async initDataTree() {
                const {data: res} = await uni.$http.get('/wx/users/pickPointList')
                if (res.status != 200) return uni.$showMsg('查詢提貨點列表失败!')
                 this.updatePickPointList(res.data)
            }
        }
       
    }
</script>

<style lang="scss">

</style>
