<template>
	<view>
		<view class="panel-list">
			<view class="panel">
				
					<text class="sub-item-title">需要支付的金额</text>
					<text class="sub-item-text1">100 CA$</text>
				

				
					<text class="sub-item-title">选择支付方式</text>
					<image src="/static/payment-wechat.png" class="payment-image"></image>
					<navigator :url="'/subpkg/payment_selection/payment_etransfer'">
						<image src="/static/payment-etransfer.png" class="payment-image"></image>
					</navigator>
					<view class="empty_block"></view>
				
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.empty_block {
		height: 200rpx;
	}
	.payment-image {
		padding-left: 150rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 400rpx;
		height: 177rpx;
	}

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
		top: 10rpx;
		align-items: center;
	
		.panel {
			position: sticky;
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			align-items: center;
			width: 100%;
			}
	}
	
	.sub-item-title {
		padding-top: 100rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		font-size: 20rpx;
		color: #aaaaaa
	}

	.sub-item-text1 {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 30rpx;
		font-weight: 800;
		text-align: center;
		color: #00aa00
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
		color: #aaaaaa;
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
		color: #aaaaaa;
	}
</style>