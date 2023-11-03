<template>
    <view class="claim-container">
       <my-claim v-if="userinfo.userRoles == 3"></my-claim>
	   <my-claimeManage  v-else></my-claimeManage>
	    <tabBar :current="1"></tabBar>
	   </view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
			}
               
        },
		 methods: {		
		 },
        computed: {
            ...mapState('m_user', ['userinfo'])
        },

    }
</script>

<style lang="scss">

</style>
