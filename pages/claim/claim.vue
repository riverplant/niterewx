<template>
    <view class="claim-container">
	   <my-claimeManage :items="items" :items-bak="itemsBak" v-if="userinfo.userRoles == 2" ></my-claimeManage>
       <my-claim :items="items" :items-bak="itemsBak"  v-else></my-claim>
	  
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
			if(this.userinfo.userRoles === 2) {
				this.getClaimeList()		
			}else if(this.token){
				this.getClaimListByOpenid()
			}
			
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
						 
			async getClaimListByOpenid() {
				const {
					data: res
				} = await uni.$http.get('/wx/users/claimList/'+this.userinfo.openid)
				if (res.status !== 200) return uni.$showMsg()
				 this.updateClaimList(res.data)
				 this.items = res.data
				 this.itemsBak = res.data
			}
		 },
        computed: {
            ...mapState('m_user', ['userinfo','token']),
			...mapState('m_order', ['claimList'])
        },

    }
</script>

<style lang="scss">

</style>
