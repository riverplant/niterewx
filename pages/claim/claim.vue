<template>
    <view>
       claim 
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        },
        
        onShow() {
            this.setBadge()
        },
        methods: {
           setBadge() {
               uni.setTabBarItem({
                   index: 0,
                     text: 'text',
                     iconPath: '/path/to/iconPath',
                     selectedIconPath: '/path/to/selectedIconPath',
                     path: 'pages/claim/claim'
               }),
               uni.setTabBarBadge({
                   index: 0,
                     text: 10+'',
               })
           } 
        }
    }
</script>

<style lang="scss">

</style>
