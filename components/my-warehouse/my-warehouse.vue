<template>
    <view>
        <view>
            <uni-data-picker placeholder="请选择班级" popup-title="请选择所在地区" :localdata="pickPointList" 
                @change="onchange" >
            </uni-data-picker>
        </view>
    </view>
</template>

<script>
    import {
        mapState, mapMutations
    } from 'vuex'
    export default {
        data() {
            return {
               dataTree:{},
               node:''
            }
        },
        computed: {
            ...mapState('m_user', ['userinfo', 'pickPointList']), 
        },
        methods: {
            ...mapMutations('m_user',['updatePickPointList']),
            onchange(e) {
                const value = e.detail.value
                this.node = value[value.length - 1].value
            },
           
        },
        
       
        
    }
</script>

<style>

</style>