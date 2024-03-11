<template>
	<view>
		<view v-if="userinfo.address.pcode == null">
			<!--选择收获地址得盒子-->
			<view class="panel-list2">
			<view class="panel2">
				<view class="panel-title2">
					无个人信息
				</view>
			</view>
			</view>

			<navigator :url="'/subpkg/adress_form/adress_form'">
				<view class="btn-text">完善个人信息</view>
			</navigator>
		</view>
		<!--渲染收货信息得盒子-->
		<view v-else>
			<view class="panel-list">
				<view class="panel">
					<view class="panel-title">
						收货人
					</view>
					<view class="panel-text">
						<text>{{userinfo.userName}}</text>
					</view>
				</view>

				<view class="panel">
					<view class="panel-title">
						电话
					</view>
					<view class="panel-text">
						<text>{{userinfo.mobile}}</text>
					</view>
				</view>

				<view class="panel">
					<view class="panel-title">
						收货地址
					</view>
					<view class="panel-text">
						<text>{{userinfo.address.address}}, {{userinfo.address.city}}, {{userinfo.address.province}}, {{userinfo.address.pcode}}, Canada</text>
					</view>
				</view>
			</view>

			<navigator :url="'/subpkg/adress_form/adress_form'">
				<view class="btn-text">修改个人信息</view>
			</navigator>

		</view>






	</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState('m_user', ['userinfo']),
		},
	}
</script>

<style lang="scss">
	.btn-text {
		margin-top: 50rpx;
		width: 750rpx;
		background-color: #00aa00;
		height: 50px;
		color: white;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}

	.panel-list {
		padding: 0 10px;
		position: relative;
		top: 5px;

		.panel {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;


		}
	}
	
	.panel-list2 {
		padding: 0 10px;
		position: relative;
		top: 5px;
		height: 400rpx;
	
		.panel2 {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			height: 400rpx;
	
	
		}
	}

	.panel-text {
		margin-top: 10rpx;
		font-size: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding-bottom: 20rpx;
	}

	.panel-title {
		padding-top: 20rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
		color: #aaaaaa ;
		border-bottom: 1px solid #F4F4F4;
	}
	.panel-title2 {
		padding-top: 180rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 300rpx;
		margin-right: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
		color: #aaaaaa ;
	}
</style>