<template>
    <view class="claim-container">
       <my-claim v-if="userinfo.userRoles == 3"></my-claim>
	   <my-claimeManage :items="items" :items-bak="itemsBak"  v-else></my-claimeManage>
	    <tabBar :current="1"></tabBar>
	   </view>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
				items:[],
				itemsBak:[]
			}
               
        },
		onShow() {
			console.log('onshow............')
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
							 this.items = res.data
							 this.itemsBak = res.data
			 			 },	
		 },
        computed: {
            ...mapState('m_user', ['userinfo']),
			...mapState('m_order', ['claimList'])
        },

    }
</script>

<style lang="scss">

</style>
