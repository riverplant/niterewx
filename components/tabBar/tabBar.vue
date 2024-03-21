<template>
	<view>
		<u-tabbar
			:value="current?current:0"
			@change="tabbarChange"
			:fixed="true"
			:placeholder="false"
			:safeAreaInsetBottom="true"
			activeColor="#dd524d"
			class="tabBar-items-container"
		>
		<block v-for="(item,i) in tabBarList" :key='i'>
			<u-tabbar-item :text="item.text" :icon= "item.iconPath"></u-tabbar-item>
		</block>
			
		</u-tabbar>
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'
	export default {
		props:{
			current:Number
		},
		data() {
			return {
			}	
		},
		computed: {
		    ...mapState('m_user', ['tabBarList'])
		},
		methods:{
			tabbarChange(e) {
			            uni.switchTab({
			                url: '/'+ this.tabBarList[e].path
			            })
			        }
		}
	}
</script>

<style lang="scss">

</style>

