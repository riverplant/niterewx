<template>
	<view>
		<!--渲染收货信息得盒子-->
			<view class="panel-list">
				<view class="panel">
					<view class="panel-title">
						您的用户名称
					</view>
					<view class="panel-text">
						<text>{{userinfo.userName}}</text>
					</view>
				</view>
				
				<view class="panel">
					<view class="panel-title">
						您的微信号
					</view>
					<view class="panel-text">
						<text>{{userinfo.wxnumber}}</text>
					</view>
				</view>

				<view class="panel">
					<view class="panel-title">
						您的电话
					</view>
					<view class="panel-text">
						<text>{{userinfo.mobile}}</text>
					</view>
				</view>
				
				<view class="panel">
					<view class="panel-title">
						您的收货仓库
					</view>
					<view class="panel-text">
						<text>{{userinfo.ppName}}</text>
					</view>
				</view>

				<view class="panel">
					<view class="panel-title">
						您的送货地址
					</view>
					<view class="panel-text">
						<text>{{userinfo.formatted_address}}</text>
					</view>
				</view>
			</view>

			<view class="panel-list" v-if=" requestReviewCount > 0">
				<view class=panel>
					<view class="order-item-msg">
						<view class="order-item-sub-left">
							<image src="/static/note_icon.png" class="order-item-sub-icon"></image>
						</view>
						<view class="order-item-sub-right">
							<text>修改仓库申请已提交,请等待审核结果。</text>
						</view>
					</view>


					
				</view>
			</view>
			<view v-else>
				<navigator :url="'/subpkg/adress_form/adress_form'">
					<view v-if="userinfo.address.pcode == null"><view class="btn-text">完善个人信息</view></view>
					<view v-else><view class="btn-text">修改个人信息</view></view>
					
				</navigator>
			</view>
			
	</view>

	</view>
</template>

<script>
	import {
		mapState, mapGetters
	} from 'vuex'
	export default {
		data() {
			return {};
		},
		computed: {
			...mapState('m_user', ['userinfo']),
			...mapGetters('m_order', ['requestCount', 'requestReviewCount'])
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
	
	.order-item-sub-left {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.order-item-sub-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.order-item-sub-icon {
		margin-right: 10rpx;
		width: 30rpx;
		height: 30rpx;
		display: block;
	}
	
	.order-item-msg {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		display: flex;
		width: 660rpx;
		margin: 20rpx;
		font-size: 25rpx;
		color: #fe642c;
	}
</style>