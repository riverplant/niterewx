<template>
    <view class="my-container">
      <my-information></my-information>
	   <tabBar :current="0"></tabBar>
    </view>
	 
</template>


<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		onShow() {
		    if ( !this.token ) {
				this.updateTabBarList( getApp().globalData.clientTabBarList )
		    }
			
		},
		computed: {
		    ...mapState('m_user', ['token'])
		},
		methods: {
			...mapMutations('m_user', [ 'updateTabBarList'])
			}
	}
</script>

<style>
    page,
    .my-container {
        height: 100%;
    }
</style>
