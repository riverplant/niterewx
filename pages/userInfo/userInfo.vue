<template>
    <view class="my-container">
        <my-login v-if="!openid"></my-login>
        <my-userinfo v-else></my-userinfo>



    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapState('m_user', ['openid'])
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    page,
    .my-container {
        height: 100%;
    }
</style>