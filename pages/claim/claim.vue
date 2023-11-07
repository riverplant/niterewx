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
		onShow() {
			this.getClaimeList()
		},
		 methods: {	
			 ...mapMutations('m_order',['updateClaimList']),
			 async getClaimeList() {
			 				const {
			 					data: res
			 				} = await uni.$http.get('/wx/users/claimList')
			 				if (res.status !== 200) return uni.$showMsg()
                             this.updateClaimList(res.data)
			 			 },	
		 },
        computed: {
            ...mapState('m_user', ['userinfo'])
        },

    }
</script>

<style lang="scss">

</style>
